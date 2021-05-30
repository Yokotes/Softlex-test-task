import { useDispatch, useSelector } from 'react-redux';
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn';
import PrimaryInput from '../../components/PrimaryInput/PrimaryInput';
import PrimaryTextarea from '../../components/PrimaryTextarea/PrimaryTextarea';
import { hideTaskModal } from '../../controllers/modalController';
import { addNewTask, changeText } from '../../controllers/tasksController';
import { RootState } from '../../models/store';
import styles from './TaskModal.module.scss';

const TaskModal = () => {
  const modalState = useSelector((state: RootState) => state.taskModal.modal);
  const dispatch = useDispatch();

  return (
    <div 
      className={`${styles.modal} ${modalState.isShow ? styles.show: ''}`}
    >
      <button 
        className={styles.closeBtn}
        onClick={(e) => dispatch(hideTaskModal(e))}
      >
        &times;
      </button>

      <h2 className={styles.title}>
        {modalState.editMode ? 'Изменить ': 'Добавить '}
        задачу
      </h2>

      <form 
        className={styles.form}
        onSubmit={
          modalState.editMode ? (
            (e) => dispatch(changeText(e.target as HTMLFormElement))
          ) : (
            (e) => dispatch(addNewTask(e.target as HTMLFormElement))
          )
        }
      >
        <PrimaryInput 
          id="task-modal-username"
          label="Имя пользователя:"
          className={styles.input}
          name="username"
          required={true}
          defaultValue={modalState.defaultUser}
          disabled={modalState.editMode ? true: false}
        />
        <PrimaryInput 
          id="task-modal-email"
          label="Email:"
          className={styles.input}
          type='email'
          name="email"
          required={true}
          defaultValue={modalState.defaultEmail}
          disabled={modalState.editMode ? true: false}
        />
        <PrimaryTextarea 
          id="task-modal-text"
          label="Описание:"
          className={`${styles.input} ${styles.area}`}
          name="text"
          required={true}
          defaultValue={modalState.defaultText}
        />
        <PrimaryBtn
          className={styles.btn}
        >
          {modalState.editMode ? 'Изменить': 'Добавить'}
        </PrimaryBtn>
      </form>
    </div>
  )
};

export default TaskModal;