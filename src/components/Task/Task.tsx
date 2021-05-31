import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showTaskModalInEdit } from '../../controllers/modalController';
import { changeStatus } from '../../controllers/tasksController';
import { RootState } from '../../models/store';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
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
  let statusValue = '';
  const user = useSelector((state: RootState) => state.auth.profile);
  const dispatch = useDispatch();

  // Form status string from number
  switch(status) {
    case 0:
      statusValue = "Не выполнено";
      break;
    case 1:
      statusValue = "Не выполнено, отредактировано";
      break;
    case 10:
      statusValue = "Выполнено";
      break;
    case 11:
      statusValue = "Выполнено, отредактировано";
      break;
  }

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
      <div className={`${styles.block} ${styles.email}`}>
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
        {
          user.token ? (
            <PrimaryBtn
              className={styles.btn}
              onClick={() => dispatch(showTaskModalInEdit(id))}
            >
              Изменить
            </PrimaryBtn>
          ) : (
            ""
          )
        }
      </div>
      <div className={`${styles.block} ${styles.statusBlock}`}>
        <div className={styles.label}>
          Статус
        </div>
        <div className={`${styles.content} ${styles.status}`}>
          {
            user.token ? (
              <input 
                type="checkbox"
                className={styles.check}
                checked={status >= 10 ? true: false}
                onChange={() => dispatch(changeStatus(id, status))}
              />
            ) : (
              statusValue
            )
          }
        </div>
      </div>
    </div>
  )
};

export default Task;