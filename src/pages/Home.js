import styles from '../styles/home.module.css';
import Comments from '../components/Comments';
import { CreatePost, FriendsList, Loader } from '../components';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/924/924915.png"
                  alt="user-pic"
                />
                <div>
                  <Link
                    to={{ pathname: `/user/${post.user._id}` }}
                    className={styles.postAuthor}
                  >
                    {post.user.name}
                  </Link>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}> {post.content} </div>

              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/889/889140.png"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png"
                    alt="comments-icon"
                  />
                  <span>2</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                  <Comments comment={comment} key={`comment-${comment._id}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {auth.user && <FriendsList />}
    </div>
  );
};

export default Home;
