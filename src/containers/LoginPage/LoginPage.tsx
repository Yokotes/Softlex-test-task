import React from 'react';
import { useDispatch } from 'react-redux';
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn';
import PrimaryForm from '../../components/PrimaryForm/PrimaryForm';
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput';
import { login } from '../../controllers/authController';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const dispatch = useDispatch()

  return (
    <div className={styles.loginPage}>
      <div className="container">
        <PrimaryForm
          className={styles.loginForm}
          onSubmit={(e) => dispatch(login(e))}
        >
          <>
            <h2 className={styles.title}>
              Sign In
            </h2>
            <PrimaryInput 
              id="login-username"
              label="Username: "
              className={styles.input}
              name="username"
            />
            <PrimaryInput 
              id="login-password"
              label="Password: "
              className={styles.input}
              isPassword={true}
              name="password"
            />
            <PrimaryBtn
              className={styles.btn}
            >
              Войти
            </PrimaryBtn>
          </>
        </PrimaryForm>
      </div>
    </div>
  )
};

export default LoginPage;