import styles from '../styles/settings.module.css';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile } from '../api';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useAuth } from '../hooks';

const UserProfile = () => {
  // const location = useLocation();
  // console.log(location);
  // const {user =  {}} = location.state;
  // if state is undefined then set the user as an empty object

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgrss, setRequestInProgrss] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  // console.log(auth);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      // console.log(response);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.message);
        return navigate('/');
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
    const friendIds = friends.map((friend) => friend.to_user._id);
    // map will return an array of id's of user's friends -> friend.to_user._id

    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleRemoveFriendClick = () => {};

  const handleAddFriendClick = async () => {
    setRequestInProgrss(true);

    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      toast.success('Friend added successfully');
    } else {
      toast.error(response.message);
    }

    setRequestInProgrss(false);
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
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInProgrss ? 'Removing Friend...' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgrss}
          >
            {requestInProgrss ? 'Adding Friend...' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
