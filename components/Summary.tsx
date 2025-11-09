
import React from 'react';
import { Task, Status } from '../types';

interface SummaryProps {
  tasks: Task[];
}

const Summary: React.FC<SummaryProps> = ({ tasks }) => {
  const summary = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<Status, number>);

  const totalTasks = tasks.length;
  const completedTasks = summary[Status.Completed] || 0;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Progress Overview</h2>
      
      <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2.5 rounded-full transition-all duration-500" 
          style={{width: `${progress}%`}}>
        </div>
      </div>
      <p className="text-right text-sm font-medium text-slate-300">{progress}% Complete</p>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-yellow-400">{summary[Status.ToDo] || 0}</p>
          <p className="text-xs text-slate-400">To Do</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-sky-400">{summary[Status.InProgress] || 0}</p>
          <p className="text-xs text-slate-400">In Progress</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-400">{summary[Status.Completed] || 0}</p>
          <p className="text-xs text-slate-400">Completed</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
