
import React from 'react';
import { Task, Status } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onUpdateStatus: (taskId: string, status: Status) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateStatus, onDelete }) => {
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="space-y-4">
        <h2 className="text-xl font-bold text-white mb-4">Your Tasks</h2>
      {sortedTasks.length > 0 ? (
        sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="text-center py-10 bg-slate-800/50 rounded-xl border border-slate-700">
          <p className="text-slate-400">No tasks yet. Add one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
