export type TaskType = {
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  description: string;
  id: string;
  title: string;
};

export const DefaultTaskData = {
  completed: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  description: "",
  title: "",
};
