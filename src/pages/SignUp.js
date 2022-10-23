import { useState } from 'react';
import styles from '../styles/login.module.css';
import toast from 'react-hot-toast';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';


const Signup = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signingUp, setSigningUp] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setSigningUp(true);

        let error = false;
        if (!name || !email || !password || !confirmPassword) {
            toast.error('please fill all the fields');
            error = true;
        }

        if (password !== confirmPassword) {
            toast.error('Make sure password and confirm password matches');
            error = true;
        }

        if (error) {
            return setSigningUp(false);
        }

        const response = await auth.signup(name, email, password, confirmPassword);

        if (response.success) {

            navigate('/login');
            setSigningUp(false);
            return toast.success('User registered successfully, please login now');
        }
        else {
            toast.error(response.message);
        }

        setSigningUp(false);

    }


    if(auth.user){
        return <Navigate to='/' />
    }

    return (
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
            <span className={styles.loginSignupHeader}> Sign Up </span>

            <div className={styles.field}>
                <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="new-password"
                />
            </div>


            <div className={styles.field}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="new-password"
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
            <div className={styles.field}>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <button disabled={signingUp}>{signingUp ? 'Signing up ...' : 'Signup'}</button>
            </div>
        </form>
    )


}

export default Signup;