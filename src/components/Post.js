import PropTypes from 'prop-types';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';
import { useState } from 'react';
import { createComment } from '../api';
import toast from 'react-hot-toast';
import { usePosts } from '../hooks';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(post._id, comment);

      if (response.success) {
        setComment('');
        posts.addComment(post._id, response.data.comment);
        toast.success('Comment created successfully');
      } else {
        toast.error(response.error);
      }
    }

    setCreatingComment(false);
  };

  return (
    <div className={styles.postWrapper} key={post._id}>
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
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            onKeyDown={handleAddComment}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
