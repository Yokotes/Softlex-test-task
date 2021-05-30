import React from 'react';
import { useDispatch } from 'react-redux';
import { showTaskModal } from '../../controllers/modalController';
import { setSortByAndFetchTasks, setSortOrderAndFetchTasks } from '../../controllers/tasksController';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import PrimarySelect from '../PrimarySelect/PrimarySelect';
import styles from './ToolPanel.module.scss';

const ToolPanel = () => {
  const sortOptions = ["Выберите...", "Имя пользователя", "Email", "Статус"]
  const sortOrderOptions = ["Убыванию", "Возрастанию"]
  const dispatch = useDispatch();

  return (
    <div className={styles.toolPanel}>
      <div className={styles.sorts}>
        <PrimarySelect 
          id="sort-select"
          label="Сортировать по:"
          options={sortOptions}
          className={styles.sortSelect}
          onChange={
            (e: React.ChangeEvent) => dispatch(setSortByAndFetchTasks(e))
          }
        />
        <PrimarySelect 
          id="sort-order"
          label="Порядок:"
          options={sortOrderOptions}
          onChange={
            (e: React.ChangeEvent) => dispatch(setSortOrderAndFetchTasks(e))
          }
        />
      </div>
      <div className={styles.btns}>
        <PrimaryBtn
          onClick={() => dispatch(showTaskModal())}
        >
          Добавить задачу
        </PrimaryBtn>
      </div>
    </div>
  )
};

export default ToolPanel;