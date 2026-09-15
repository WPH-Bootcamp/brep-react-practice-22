import TodoList from './TodoList';
import TodoMutation from './TodoMutation';
import TodoPagination from './TodoPagination';
import InfiniteTodos from './InfiniteTodos';

function TodosDemo() {
  return (
    <>
      <TodoList />
      <TodoMutation />
      <TodoPagination />
      <InfiniteTodos />
    </>
  );
}

export default TodosDemo;
