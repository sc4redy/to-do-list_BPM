// src/components/FilterPanel.jsx
import { useDispatch, useSelector } from 'react-redux';
import {
  setStatusFilter,
  setCategoryFilter,
  setSearchFilter,
} from '../store/filtersSlice';

function FilterPanel() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  return (
    <div className="filter-panel">
      <select
        value={filters.status}
        onChange={(e) => dispatch(setStatusFilter(e.target.value))}
      >
        <option value="all">Semua</option>
        <option value="active">Belum selesai</option>
        <option value="completed">Selesai</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
      >
        <option value="all">Semua kategori</option>
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
      </select>

      <input
        type="text"
        placeholder="Cari tugas..."
        value={filters.search}
        onChange={(e) => dispatch(setSearchFilter(e.target.value))}
      />
    </div>
  );
}

export default FilterPanel;
