import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import styles from '../styles/home.module.css';
import Comments from '../components/Comments';
import { getPosts } from '../api';
import { Loader } from '../components';

const Home = () => {

    // console.log(posts);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await getPosts();
            // console.log('response', response);
            if (response.success) {
                setPosts(response.data.posts);
            }
            setLoading(false);
        };

        fetchPosts();

    }, []);


    if (loading) {
        return <Loader />
    }

    return (

        <div className={styles.postsList}>

            {posts.map((post) => (
                <div className={styles.postWrapper} key={`post-${post._id}`} >
                    <div className={styles.postHeader}>
                        <div className={styles.postAvatar}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/924/924915.png"
                                alt="user-pic"
                            />
                            <div>
                                <span className={styles.postAuthor}> {post.user.name} </span>
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
                                <span>5</span>
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
    )

};

Home.propTypes = {
    posts: PropTypes.array.isRequired,

}

export default Home;

