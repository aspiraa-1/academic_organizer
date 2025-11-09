
import React, { useState, useEffect, useCallback } from 'react';
import { Task, Status, TaskType } from './types';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Summary from './components/Summary';

const APP_STORAGE_KEY = 'examAssignmentTracker.tasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(APP_STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
      localStorage.removeItem(APP_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = useCallback((title: string, type: TaskType, dueDate: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      type,
      dueDate,
      status: Status.ToDo,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  const handleUpdateTaskStatus = useCallback((taskId: string, status: Status) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200">
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Header />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Summary tasks={tasks} />
            <TaskForm onAddTask={handleAddTask} />
          </div>
          <div className="md:col-span-2">
            <TaskList
              tasks={tasks}
              onUpdateStatus={handleUpdateTaskStatus}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
