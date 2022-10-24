import styles from '../styles/settings.module.css';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useAuth } from '../hooks';

const UserProfile = () => {
  // const location = useLocation();
  // console.log(location);
  // const {user = {}} = location.state;
  // if state is undefined then set the user as an empty object

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  // console.log('userId', userId);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.message);
        navigate('/');
      }

      setLoading(false);
    };

    getUser();
  }, [navigate, userId]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships;
    console.log(auth.user);
    const friendIds = friends.map((friend) => friend.to_user._id);
    // map will return an array of id's of user's friends -> friend.to_user._id

    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/924/924915.png"
          alt="profile-pic"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}> Email </div>
        <div className={styles.fieldValue}> {user.email} </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}> Name </div>
        <div className={styles.fieldValue}> {user.name} </div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}> Add Friend </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
