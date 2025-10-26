import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    { name: "John Doe", marks: 85 },
    { name: "Jane Smith", marks: 92 },
    { name: "Bob Johnson", marks: 78 },
    { name: "Alice Brown", marks: 95 },
    { name: "Charlie Wilson", marks: 88 },
  ]
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    sortAsc: (state) => {
      state.list.sort((a, b) => a.marks - b.marks);
    },
    sortDesc: (state) => {
      state.list.sort((a, b) => b.marks - a.marks);
    }
  }
});

export const { sortAsc, sortDesc } = studentsSlice.actions;
export default studentsSlice.reducer;
