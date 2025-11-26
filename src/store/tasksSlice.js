// src/store/tasksSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    // contoh awal
    {
      id: '1',
      title: 'Contoh tugas pertama',
      category: 'General',
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ title, category }) {
        return {
          payload: {
            id: nanoid(),
            title,
            category: category || 'General',
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    deleteTask(state, action) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    editTask(state, action) {
      const { id, title, category } = action.payload;
      const task = state.items.find((t) => t.id === id);
      if (task) {
        task.title = title ?? task.title;
        task.category = category ?? task.category;
      }
    },
    toggleTaskCompleted(state, action) {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    reorderTasks(state, action) {
      // untuk drag-and-drop (bonus)
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.items.splice(sourceIndex, 1);
      state.items.splice(destinationIndex, 0, removed);
    },
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  toggleTaskCompleted,
  reorderTasks,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;

