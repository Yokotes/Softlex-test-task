import React from 'react';
import styles from './PrimarySelect.module.scss';

type PrimarySelectProps = {
  label: string;
  id: string;
  options: string[];
  className?: string;
}

const PrimarySelect = ({ 
  options,
  label,
  id,
  className = ""
}: PrimarySelectProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <label 
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
      <select
        id={id} 
        className={styles.select}
      >
        {
          options.map((option, index) => (
            <option value={index} key={index}>{option}</option>
          ))
        }
      </select>
    </div>
  )
};

export default PrimarySelect;