import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskManagement from './pages/TaskManagement';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<TaskManagement />} />
        {/* Diğer route'ları ekleyin */}
      </Routes>
    </Router>
  );
};

export default App;
