import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../controllers/tasksController';
import { RootState } from '../../models/store';
import Pagination from '../Pagination/Pagination';
import Task, { TaskProps } from '../Task/Task';
import styles from './TasksContainer.module.scss';

const TasksContainer = () => {
  const dispatch = useDispatch();
  const tasksState: {
    tasks: TaskProps[],
    totalTaskCount: number
  } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch,])
  
  return (
    <div className={styles.container}>
      <div className={styles.tasks}>
        {
          tasksState.tasks.length > 0 ? (
            tasksState.tasks.map(task => (
              <Task 
                key={task.id}
                id={task.id}
                username={task.username}
                email={task.email}
                text={task.text}
                status={task.status}
              />
            ))
          ) : (
            <div className={styles.noTasks}>
              There is no tasks
            </div>
          )
        }
      </div>
      <Pagination 
        totalCount={tasksState.totalTaskCount}
      />
    </div>
  )
};

export default TasksContainer;