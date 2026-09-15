export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type CreateTodoInput = Omit<Todo, 'id'>;
export type UpdateTodoInput = Todo;

export type InfiniteTodoPage = {
  items: Todo[];
  nextPage: number | undefined;
};
