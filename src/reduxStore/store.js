// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Example slice (you can add more later)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Export actions
export const { increment, decrement } = counterSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default store;
