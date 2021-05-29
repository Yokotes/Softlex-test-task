import React from 'react';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import PrimarySelect from '../PrimarySelect/PrimarySelect';
import styles from './ToolPanel.module.scss';

const ToolPanel = () => {
  const sortOptions = ["Имя пользователя", "Email", "Статус"]
  const sortOrderOptions = ["Убыванию", "Возрастанию"]

  return (
    <div className={styles.toolPanel}>
      <div className={styles.sorts}>
        <PrimarySelect 
          id="sort-select"
          label="Сортировать по:"
          options={sortOptions}
          className={styles.sortSelect}
        />
        <PrimarySelect 
          id="sort-order"
          label="Порядок:"
          options={sortOrderOptions}
        />
      </div>
      <div className={styles.btns}>
        <PrimaryBtn>
          Добавить задачу
        </PrimaryBtn>
      </div>
    </div>
  )
};

export default ToolPanel;