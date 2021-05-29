import React from 'react';
import styles from './Task.module.scss';

export type TaskProps = {
  id: number;
  username: string;
  email: string;
  text: string;
  status: number;
}

const Task = ({
  id,
  username,
  email,
  text,
  status
}: TaskProps) => {
  return (
    <div className={styles.task}>
      <div className={styles.block}>
        <div className={styles.label}>
          Пользователь
        </div>
        <div className={styles.content}>
          {username}
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.label}>
          E-mail
        </div>
        <div className={styles.content}>
          {email}
        </div>
      </div>
      <div className={`${styles.block} ${styles.text}`}>
        <div className={styles.label}>
          Описание
        </div>
        <p className={styles.content}>
          {text}
        </p>
      </div>
      <div className={styles.block}>
        <div className={styles.label}>
          Статус
        </div>
        <div className={`${styles.content} ${styles.status}`}>
          {status >= 10 ? 'Completed': 'In work'}
        </div>
      </div>
    </div>
  )
};

export default Task;