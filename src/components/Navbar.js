import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className={styles.nav}> 
        
            <div className={styles.leftDiv}>
                <Link to='/'>
                    <img alt='logo' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png' />
                </Link>
            </div>

            <div className={styles.rightNav}> 
                <div className={styles.user}> 
                    <Link to='/'>
                        <img src='https://cdn-icons-png.flaticon.com/512/924/924915.png' alt='user'  className={styles.userDp} />
                    </Link>
                    <span> Suyash </span>
                </div>

                <div className={styles.navLinks}> 
                    <ul> 
                        <li> 
                            <Link to='/login' > Log in </Link>
                        </li> 
                        <li> 
                            <Link to='/' > Log out </Link>
                        </li>
                        <li> 
                            <Link to='/' > Register </Link>
                        </li>
                    </ul>
                </div>
            </div>
        
        </div>
    )
};


export default Navbar;