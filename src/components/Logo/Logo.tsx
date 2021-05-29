import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <h1 className={styles.logo}>
      <Link to="/">
        Test task
      </Link>
    </h1>
  )
};

export default Logo;