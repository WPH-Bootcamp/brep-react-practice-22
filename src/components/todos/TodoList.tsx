import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../api/todos';
import { todoKeys } from '../../lib/queryKeys';

export default function TodoList() {
  const { data, isPending, isFetching, error, isError } = useQuery({
    queryKey: todoKeys.all,
    queryFn: fetchTodos,
  });

  if (isPending) return <p>Loading todos....</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <h2>Todo List</h2>
      {isFetching && <small>Updating data...</small>}

      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            {todo.completed ? ' - [COMPLETED]' : ' - [NOT YET]'}
          </li>
        ))}
      </ul>
    </div>
  );
}
