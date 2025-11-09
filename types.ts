
export enum Status {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export enum TaskType {
  Exam = 'Exam',
  Assignment = 'Assignment',
}

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  dueDate: string; // ISO string date
  status: Status;
}
