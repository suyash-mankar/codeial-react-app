import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from '../styles/login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoggingIn(true);

        if (!email || !password) {
            toast.error('please enter both email and password');
        }
    }


    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <span className={styles.loginSignupHeader}> Log In </span>

            <div className={styles.field}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={styles.field} disabled={loggingIn}>
                <button>{loggingIn ? 'Loggin In ...' : 'Log In'}</button>
            </div>
        </form>
    );
};

export default Login;
