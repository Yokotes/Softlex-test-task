import React from 'react';
import styles from './PrimaryForm.module.scss';

type PrimaryFormProps = {
  children: React.ReactChild;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void
}

const PrimaryForm = ({
  children,
  className = "",
  onSubmit
}: PrimaryFormProps) => {
  return (
    <form 
      className={`${styles.form} ${className}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
};

export default PrimaryForm;