// src/App.jsx
import './App.css';
import TaskForm from './components/TaskForm';
import FilterPanel from './components/FilterPanel';
import TaskList from './components/TaskList';
import ApiPanel from './components/ApiPanel';

function App() {
  return (
    <div className="app-container">
      <h1>To-Do List BPM</h1>

      <section className="todo-section">
        <TaskForm />
        <FilterPanel />
        <TaskList />
      </section>

      <section className="api-section">
        <ApiPanel />
      </section>
    </div>
  );
}

export default App;
