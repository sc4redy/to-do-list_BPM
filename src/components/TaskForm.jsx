// src/components/TaskForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';

function TaskForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true); // trigger animasi loading

    // simulasi loading 500ms biar ada anim nya
    setTimeout(() => {
      dispatch(addTask({ title, category }));
      setTitle('');
      setCategory('General');
      setSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Tambah tugas baru..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
      </select>
      <button type="submit" disabled={submitting}>
        {submitting ? (
          <span className="loader-spinner" />
        ) : (
          'Tambah'
        )}
      </button>
    </form>
  );
}

export default TaskForm;
