// src/components/ApiPanel.jsx
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiRequested } from '../store/apiSlice';

function ApiPanel() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.api);

  const handleFetch = () => {
    dispatch(fetchApiRequested());
  };

  return (
    <div className="api-panel">
      <div className="api-header">
        <h2>Info Waktu (REST API)</h2>
        <button onClick={handleFetch} disabled={loading}>
          {loading ? <span className="loader-spinner" /> : 'Refresh'}
        </button>
      </div>

      {loading && <p className="api-loading">Mengambil data...</p>}
      {error && <p className="api-error">Error: {error}</p>}
      {data && !loading && (
        <div className="api-data">
          <p><strong>Timezone:</strong> {data.timezone}</p>
          <p><strong>Datetime:</strong> {data.datetime}</p>
          <p><strong>Day of Week:</strong> {data.day_of_week}</p>
        </div>
      )}
    </div>
  );
}

export default ApiPanel;