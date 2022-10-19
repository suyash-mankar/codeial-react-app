import styles from '../styles/navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.nav}> 
        
            <div className={styles.leftDiv}>
                <a href='/'>
                    <img alt='logo' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png' />
                </a>
            </div>

            <div className={styles.rightNav}> 
                <div className={styles.user}> 
                    <a href='/'>
                        <img src='https://cdn-icons-png.flaticon.com/512/924/924915.png' alt='user'  className={styles.userDp} />
                    </a>
                    <span> Suyash </span>
                </div>

                <div className={styles.navLinks}> 
                    <ul> 
                        <li> 
                            <a href='/' > Log in </a>
                        </li> 
                        <li> 
                            <a href='/' > Log out </a>
                        </li>
                        <li> 
                            <a href='/' > Register </a>
                        </li>
                    </ul>
                </div>
            </div>
        
        </div>
    )
};


export default Navbar;