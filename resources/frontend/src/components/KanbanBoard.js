import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import api from '../api';

const KanbanBoard = () => {
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

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find(t => t.id === parseInt(draggableId));
    if (task) {
      const updatedTask = { ...task, status: destination.droppableId };
      try {
        await api.put(`/tasks/${task.id}`, { status: updatedTask.status });
        fetchTasks();
      } catch (error) {
        console.error('Görev güncellenirken hata oluştu:', error);
      }
    }
  };

  const statuses = ['pending', 'in_progress', 'completed'];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {statuses.map(status => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: '#f0f0f0',
                  padding: '10px',
                  width: '30%',
                  minHeight: '500px',
                }}
              >
                <h3>{status.replace('_', ' ').toUpperCase()}</h3>
                {tasks
                  .filter(task => task.status === status)
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            padding: '16px',
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                            backgroundColor: '#fff',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <h4>{task.title}</h4>
                          <p>{task.description}</p>
                          <small>Atanan: {task.user.name}</small>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
