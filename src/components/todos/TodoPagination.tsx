import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchTodoPage } from '../../api/todos';
import { todoKeys } from '../../lib/queryKeys';
import { useState } from 'react';

const LIMIT = 10;
const TOTAL_TODOS = 200;
const LAST_PAGE = Math.ceil(TOTAL_TODOS / LIMIT);

export default function TodoPagination() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: todoKeys.page(page, LIMIT),
      queryFn: () => fetchTodoPage(page, LIMIT),
      placeholderData: keepPreviousData,
    });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;
  return (
    <section>
      <h2>Todo Pagination</h2>
      <p>
        Page : {page} / {LAST_PAGE}
      </p>
      {isFetching && <p>Fetching page...</p>}
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        disabled={page === 1}
        onClick={() => setPage((current) => Math.max(1, current - 1))}
      >
        Previous
      </button>
      <button
        disabled={page === LAST_PAGE || isPlaceholderData}
        onClick={() => setPage((current) => Math.min(LAST_PAGE, current + 1))}
      >
        Next
      </button>
    </section>
  );
}
