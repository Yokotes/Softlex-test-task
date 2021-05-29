import React from 'react';
import TasksContainer from '../../components/TasksContainer/TasksContainer';
import ToolPanel from '../../components/ToolPanel/ToolPanel';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className="container">
      <div className={styles.homePage}>
        <ToolPanel />
        <TasksContainer />
      </div>
    </div>
  )
};

export default HomePage;