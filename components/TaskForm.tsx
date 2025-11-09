
import React, { useState } from 'react';
import { TaskType } from '../types';
import PlusIcon from './icons/PlusIcon';

interface TaskFormProps {
  onAddTask: (title: string, type: TaskType, dueDate: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TaskType>(TaskType.Assignment);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title cannot be empty.');
      return;
    }
    setError('');
    onAddTask(title, type, dueDate);
    setTitle('');
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Physics Lab Report"
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-slate-300 mb-1">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as TaskType)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={TaskType.Assignment}>Assignment</option>
            <option value={TaskType.Exam}>Exam</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-slate-300 mb-1">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
        >
          <PlusIcon />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
