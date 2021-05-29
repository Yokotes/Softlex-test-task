import React from 'react';
import Pagination from '../Pagination/Pagination';
import Task, { TaskProps } from '../Task/Task';
import styles from './TasksContainer.module.scss';

const TasksContainer = () => {
  const tasks: TaskProps[] = [
    {
      id: 1,
      username: "admin",
      email: "main@mail.com",
      text: "Test task",
      status: 10
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tasks}>
        {
          tasks.map(task => (
            <Task 
              key={task.id}
              id={task.id}
              username={task.username}
              email={task.email}
              text={task.text}
              status={task.status}
            />
          ))
        }
      </div>
      <Pagination 
        totalCount={5}
      />
    </div>
  )
};

export default TasksContainer;