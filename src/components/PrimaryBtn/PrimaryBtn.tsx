import React from 'react';
import styles from './PrimaryBtn.module.scss';

type PrimaryBtnProps = {
  children: React.ReactChild;
  className?: string;
  onClick?: () => void
}

const PrimaryBtn = ({
  children,
  className = "",
  onClick
}: PrimaryBtnProps) => {
  return (
    <button
      className={`${styles.btn} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
};

export default PrimaryBtn;