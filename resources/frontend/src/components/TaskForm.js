import React, { useState, useEffect } from 'react';
import api from '../api';

const TaskForm = ({ selectedTask, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('pending');
  const [startTime, setStartTime] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setAssignedTo(selectedTask.assigned_to);
      setStatus(selectedTask.status);
      setStartTime(selectedTask.start_time ? selectedTask.start_time.substring(0,16) : '');
    }
  }, [selectedTask]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users'); 
      setUsers(response.data);
    } catch (error) {
      console.error('Kullanıcılar alınırken hata oluştu:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      assigned_to: assignedTo,
      status,
      start_time: startTime,
    };
    try {
      if (selectedTask) {
        await api.put(`/tasks/${selectedTask.id}`, data);
      } else {
        await api.post('/tasks', data);
      }
      onSuccess();
    } catch (error) {
      console.error('Görev kaydedilirken hata oluştu:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Başlık:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Açıklama:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Atanan Kişi:</label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        >
          <option value="">Seçiniz</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Durum:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Beklemede</option>
          <option value="in_progress">Devam Ediyor</option>
          <option value="completed">Tamamlandı</option>
        </select>
      </div>
      <div>
        <label>Başlangıç Zamanı:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <button type="submit">Kaydet</button>
    </form>
  );
};

export default TaskForm;
