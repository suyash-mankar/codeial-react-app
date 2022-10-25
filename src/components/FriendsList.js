import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';

const FriendsList = () => {
  const auth = useAuth();
  const { friendships = [] } = auth.user;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friendships && friendships.length === 0 && (
        <h1 className={styles.noFriends}> No Friends Found </h1>
      )}

      {friendships && friendships.length !== 0  &&
        friendships.map((friend) => (
          <div key={`friend-${friend._id}`}>
            <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`}>
              <div className={styles.friendsImg}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2716/2716612.png"
                  alt="user-friend"
                />
              </div>
              <div className={styles.friendsName}> {friend.to_user.email} </div> 
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendsList;