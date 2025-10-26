import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortAsc, sortDesc } from './studentsSlice';

export default function App() {
  const students = useSelector(state => state.students.list);
  const dispatch = useDispatch();

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h2>Student List</h2>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => dispatch(sortAsc())} style={{ marginRight: '5px' }}>Sort Ascending</button>
        <button onClick={() => dispatch(sortDesc())}>Sort Descending</button>
      </div>
      <table border="1" width="100%" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
