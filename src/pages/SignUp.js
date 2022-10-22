import styles from '../styles/login.module.css';


const SignUp = () => {


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!email || !password) {
            toast.error('please enter both email and password');
        }

        const response = await auth.login(email, password);

        if (response.success) {
            toast.success('Successfully Logged In');
        }
        else {
            toast.error(response.message);
        }

        setLoggingIn(false);

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

            <div className={styles.field}>
                <button disabled={loggingIn}>{loggingIn ? 'Logging     In ...' : 'Log In'}</button>
            </div>
        </form>
    )


}

export default SignUp;