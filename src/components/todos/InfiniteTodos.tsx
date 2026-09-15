import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchInfiniteTodos } from '../../api/todos';
import { todoKeys } from '../../lib/queryKeys';

export default function InfiniteTodos() {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: todoKeys.infinite(),
    queryFn: ({ pageParam }) => fetchInfiniteTodos(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <section>
      <h2>Infinite Todos</h2>

      {data.pages.map((page) =>
        page.items.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            {todo.completed ? ' - [COMPLETED]' : ' - [NOT YET]'}
          </li>
        ))
      )}

      <button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Semua todo sudah dimuat.'}
      </button>
    </section>
  );
}
