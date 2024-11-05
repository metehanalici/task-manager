import React, { useEffect, useState } from 'react';
import api from '../api';

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Görevler alınırken hata oluştu:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Görev silinirken hata oluştu:', error);
    }
  };

  return (
    <div>
      <h2>Görevler</h2>
      <table>
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Açıklama</th>
            <th>Atanan Kişi</th>
            <th>Durum</th>
            <th>Başlangıç Zamanı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.user.name}</td>
              <td>{task.status}</td>
              <td>{task.start_time}</td>
              <td>
                <button onClick={() => onEdit(task)}>Düzenle</button>
                <button onClick={() => handleDelete(task.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
