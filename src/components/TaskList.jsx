// src/components/TaskList.jsx
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTaskCompleted,
  deleteTask,
  editTask,
  reorderTasks,
} from '../store/tasksSlice';
import { useState } from 'react';

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const filters = useSelector((state) => state.filters);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('General');

  const [draggedId, setDraggedId] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (filters.status === 'completed' && !task.completed) return false;
    if (filters.status === 'active' && task.completed) return false;
    if (filters.category !== 'all' && task.category !== filters.category) {
      return false;
    }
    if (
      filters.search &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditCategory(task.category);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditCategory('General');
  };

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    dispatch(
      editTask({
        id: editingId,
        title: editTitle,
        category: editCategory,
      })
    );
    cancelEdit();
  };

  // drag handlers
  const handleDragStart = (e, taskId) => {
    setDraggedId(taskId);
    // optional: buat Firefox
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // wajib biar onDrop kepanggil
  };

  const handleDropOnItem = (e, targetTaskId) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetTaskId) {
      setDraggedId(null);
      return;
    }

    const sourceIndex = tasks.findIndex((t) => t.id === draggedId);
    const destinationIndex = tasks.findIndex((t) => t.id === targetTaskId);

    if (sourceIndex === -1 || destinationIndex === -1) {
      setDraggedId(null);
      return;
    }

    dispatch(
      reorderTasks({
        sourceIndex,
        destinationIndex,
      })
    );
    setDraggedId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  if (!filteredTasks.length) {
    return <p className="empty-state">Tidak ada tugas yang cocok.</p>;
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => {
        const isEditing = editingId === task.id;
        const isDragging = draggedId === task.id;

        return (
          <li
            key={task.id}
            className={`task-item ${task.completed ? 'done' : ''} ${
              isDragging ? 'dragging' : ''
            }`}
            draggable={!isEditing} // jangan bisa drag saat lagi edit
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDropOnItem(e, task.id)}
            onDragEnd={handleDragEnd}
          >
            <div className="task-main">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTaskCompleted(task.id))}
              />

              {isEditing ? (
                <div className="task-edit">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
                    <option value="General">General</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              ) : (
                <div>
                  <div className="task-title">{task.title}</div>
                  <div className="task-meta">{task.category}</div>
                </div>
              )}
            </div>

            <div className="task-actions">
              {isEditing ? (
                <>
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <button onClick={() => startEdit(task)}>Edit</button>
              )}
              <button
                className="delete-btn"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                ✕
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TaskList;
