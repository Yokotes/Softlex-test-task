import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../models/store';
import { signOut, tryAuth } from '../../controllers/authController';
import styles from './Auth.module.scss';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';

const Auth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.profile);

  useEffect(() => {
    if (!user.token) {
      dispatch(tryAuth());
    }
   }, [dispatch, user])

  return (
    user.token ? (
      <div className={styles.hello}>
        <strong>{user.username}</strong>
        <PrimaryBtn
          className={styles.btn}
          onClick={() => dispatch(signOut())}
        >
          Выйти
        </PrimaryBtn>
      </div>
    ) : (
      <Link to="/login" className={styles.auth}>
        Войти
      </Link>
    )

  )
};

export default Auth;