
import React from 'react';
import { Task, Status, TaskType } from '../types';
import TrashIcon from './icons/TrashIcon';
import AssignmentIcon from './icons/AssignmentIcon';
import ExamIcon from './icons/ExamIcon';

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (taskId: string, status: Status) => void;
  onDelete: (taskId: string) => void;
}

const typeConfig = {
    [TaskType.Assignment]: {
        icon: <AssignmentIcon />,
        color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        iconBg: 'bg-blue-500/10'
    },
    [TaskType.Exam]: {
        icon: <ExamIcon />,
        color: 'bg-red-500/20 text-red-300 border-red-500/30',
        iconBg: 'bg-red-500/10'
    }
};

const statusConfig = {
    [Status.ToDo]: 'border-l-yellow-400',
    [Status.InProgress]: 'border-l-sky-400',
    [Status.Completed]: 'border-l-green-400',
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateStatus, onDelete }) => {
    
  const { icon, color, iconBg } = typeConfig[task.type];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Accounts for timezone offset to show the correct local date
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={`bg-slate-800/60 rounded-lg border border-slate-700 border-l-4 ${statusConfig[task.status]} p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:bg-slate-800`}>
      <div className={`p-3 rounded-full ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-white">{task.title}</h3>
        <p className="text-sm text-slate-400 mt-1">{formatDate(task.dueDate)}</p>
        <span className={`mt-2 inline-block text-xs font-semibold px-2 py-1 rounded-full border ${color}`}>
            {task.type}
        </span>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0">
        <select
          value={task.status}
          onChange={(e) => onUpdateStatus(task.id, e.target.value as Status)}
          className="flex-grow sm:flex-grow-0 bg-slate-700 border border-slate-600 rounded-md py-1.5 px-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value={Status.ToDo}>To Do</option>
          <option value={Status.InProgress}>In Progress</option>
          <option value={Status.Completed}>Completed</option>
        </select>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
          aria-label="Delete task"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
