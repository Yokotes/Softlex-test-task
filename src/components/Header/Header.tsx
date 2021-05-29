import React from 'react';
import Auth from '../Auth/Auth';
import Logo from '../Logo/Logo';
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <Logo />
        <Auth />
      </div>
    </header>
  )
};

export default Header;