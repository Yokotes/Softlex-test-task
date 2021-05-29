import React from 'react';
import styles from './PrimaryInput.module.scss';

type PrimaryInputProps = {
  id: string;
  className?: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean,
  name?: string,
}

const PrimaryInput = ({
  id,
  label,
  className = "",
  onChange,
  isPassword = false,
  name
}: PrimaryInputProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input 
        type={isPassword ? 'password': 'text'} 
        className={styles.input}
        id={id}
        name={name}
      />
    </div>
  )
};

export default PrimaryInput;