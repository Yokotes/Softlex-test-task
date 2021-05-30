import React from 'react';
import styles from './PrimaryTextarea.module.scss';

type PrimaryTextareaProps = {
  id: string;
  label: string;
  name?: string;
  className?: string;
  required?: boolean;
  defaultValue?: string;
}

const PrimaryTextarea = ({
  id,
  label,
  className = "",
  name = "",
  required = false,
  defaultValue = ""
}: PrimaryTextareaProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <label
        className={styles.label} 
        htmlFor={id}
      >
        {label}
      </label>
      <textarea 
        name={name} 
        id={id}
        className={styles.area}
        required = {required}
        defaultValue={defaultValue}
      ></textarea>
    </div>
  )
};

export default PrimaryTextarea;