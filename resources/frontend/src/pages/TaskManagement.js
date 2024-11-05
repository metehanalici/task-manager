import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import KanbanBoard from '../components/KanbanBoard';

const TaskManagement = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const handleSuccess = () => {
    setSelectedTask(null);
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Görev Yönetimi</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '45%' }}>
          <TaskForm selectedTask={selectedTask} onSuccess={handleSuccess} />
          <TaskList onEdit={handleEdit} key={refresh} />
        </div>
        <div style={{ width: '50%' }}>
          <KanbanBoard key={refresh} />
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
