export interface Task {
    id?: number;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Completed'; // restrict to allowed values
    createdDate?: string;
  }  