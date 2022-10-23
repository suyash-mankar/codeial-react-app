import { useState } from 'react';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import toast from 'react-hot-toast';

const Settings = () => {
  const auth = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  // if the user exist then check if auth.user.name exits, if it exists then set initial state as auth.user.name else set is as null
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const updateProfile = async () => {
    setSavingForm(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      toast.error('please fill all the fields');
      error = true;
    }

    if (password !== confirmPassword) {
      toast.error('password and confirm password does not match');
      error = true;
    }

    if (error) {
      return setSavingForm(false);
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    console.log('settings response', response);

    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();
      return toast.success('User updated successfully');
    } else {
      toast.error(response.message);
    }

    setSavingForm(false);
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
        <div className={styles.fieldValue}> {auth.user?.email} </div>
        {/* {auth.user?.email} is same as {auth.user && auth.user.email} */}
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}> Name </div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}> {auth.user?.name} </div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}> Password </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}> Confirm Password </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving Profile..' : 'Save Profile'}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
