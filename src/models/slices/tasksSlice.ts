import { createSlice } from '@reduxjs/toolkit'
import { TaskProps } from '../../components/Task/Task';

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState: {
    tasks: []
  },
  reducers: {
    addTask: (state, action) => {
      const task: TaskProps = action.payload;
      const tasks: TaskProps[] = state.tasks;
      tasks.push(task);
    },
    removeTask: (state, action) => {
      let tasks: TaskProps[] = state.tasks;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tasks = tasks.filter(task => task.id !== action.payload);
    },
    clearTasks: state => {
      state.tasks = [];
    }
  }
});

export default tasksSlice.reducer;
export const {
  addTask,
  clearTasks,
  removeTask
} = tasksSlice.actions;