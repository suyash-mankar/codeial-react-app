import styles from '../styles/settings.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgrss, setRequestInProgrss] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
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

  const handleRemoveFriendClick = async () => {
    setRequestInProgrss(true);
    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friendships.filter(
        (friend) => friend.to_user._id === userId
      ); 

      auth.updateUserFriends(false, friendship[0]);
      toast.success('Friend removed successfully');
    } else {
      toast.error(response.message);
    }

    setRequestInProgrss(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgrss(true);

    const response = await addFriend(userId);
    const { friendship } = response.data;

    if (response.success) {
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
            disabled={requestInProgrss}
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
