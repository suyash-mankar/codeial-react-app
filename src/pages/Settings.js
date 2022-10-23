import { useState } from 'react';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';

const Settings = () => {
  const [editMode, setEditMode] = useState(false);

  const auth = useAuth();

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
          <input type="text" value={auth.user.name} />
        ) : (
          <div className={styles.fieldValue}> {auth.user?.name} </div>
        )}
      </div>

      {editMode ? (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}> Password </div>
            <input type="password" />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}> Confirm Password </div>
            <input type="password" />
          </div>
        </>
      ) : null}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button className={`button ${styles.editBtn}`}>Save</button>
            <button className={`button ${styles.editBtn}`}>Go back</button>
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
