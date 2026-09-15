import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo, updateTodo, deleteTodo } from '../../api/todos';

export default function TodoMutation() {
  const queryClient = useQueryClient();

  const invalidateTodos = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['todos'],
    });
  };

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: invalidateTodos,
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: invalidateTodos,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: invalidateTodos,
  });
  
  return (
    <section>
      <h2>Mutation Demo</h2>
      <button
        onClick={() =>
          createMutation.mutate({
            userId: 1,
            title: 'Todo Baru',
            completed: false,
          })
        }
      >
        Create Todo
      </button>
      <button
        onClick={() =>
          updateMutation.mutate({
            id: 1,
            userId: 1,
            title: 'Todo Updated',
            completed: true,
          })
        }
      >
        Update Todo #1
      </button>
      <button onClick={() => deleteMutation.mutate(1)}>Delete Todo #1</button>
    </section>
  );
}
