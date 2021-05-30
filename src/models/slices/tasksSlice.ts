import { createSlice } from '@reduxjs/toolkit'
import { TaskProps } from '../../components/Task/Task';

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState: {
    tasks: [],
    totalTaskCount: 0,
    sortBy: 'id',
    sortOrder: 'desc',
    page: 1
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
    },
    setTotalTaskCount: (state, action) => {
      state.totalTaskCount = action.payload;
    },
    setSortBy: (state, action) => {
      const sortBy: 'id' | 'username' | "email" | "status" = action.payload;
      state.sortBy = sortBy;
    },
    setSortOrder: (state, action) => {
      const sortOrder: 'asc' | 'desc' = action.payload;
      state.sortOrder = sortOrder;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTaskStatus: (state, action) => {
      const task: TaskProps = state.tasks.filter((task: TaskProps) => task.id === action.payload.id)[0];
      task.status = action.payload.status;
    },
    setTaskText: (state, action) => {
      const task: TaskProps = state.tasks.filter((task: TaskProps) => task.id === action.payload.id)[0];
      task.text = action.payload.text;
    }
  }
});

export default tasksSlice.reducer;
export const {
  addTask,
  clearTasks,
  removeTask,
  setTotalTaskCount,
  setSortBy,
  setSortOrder,
  setPage,
  setTaskStatus,
  setTaskText
} = tasksSlice.actions;