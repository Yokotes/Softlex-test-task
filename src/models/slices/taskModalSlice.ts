import { createSlice } from "@reduxjs/toolkit";

const taskModalSlice = createSlice({
  name: 'taskModalSlice',
  initialState: {
    modal: {
      isShow: false,
      editMode: false,
      taskId: -1,
      defaultUser: '',
      defaultEmail: '',
      defaultText: '',
    }
  },
  reducers: {
    setIsShow: (state, action) => {
      state.modal.isShow = action.payload;
    },

    setEditMode: (state, action) => {
      state.modal.editMode = action.payload;
    },

    setTaskId: (state, action) => {
      state.modal.taskId = action.payload;
    },
    
    setDefaultUser: (state, action) => {
      state.modal.defaultUser = action.payload;
    },

    setDefaultEmail: (state, action) => {
      state.modal.defaultEmail = action.payload;
    },

    setDefaultText: (state, action) => {
      state.modal.defaultText = action.payload;
    }
  }
});

export default taskModalSlice.reducer;
export const { 
  setEditMode,
  setIsShow,
  setTaskId,
  setDefaultEmail,
  setDefaultText,
  setDefaultUser
} = taskModalSlice.actions;