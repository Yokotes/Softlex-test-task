import React from 'react';
import styles from './PrimaryInput.module.scss';

type PrimaryInputProps = {
  id: string;
  className?: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email';
  name?: string;
  required?: boolean;
  defaultValue?: string;
  disabled?:boolean;
}

const PrimaryInput = ({
  id,
  label,
  className = "",
  onChange,
  type = 'text',
  name = "",
  required = false,
  defaultValue = "",
  disabled = false,
}: PrimaryInputProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input 
        type={type} 
        className={styles.input}
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  )
};

export default PrimaryInput;