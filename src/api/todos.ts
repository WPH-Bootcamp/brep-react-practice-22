import type {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
  InfiniteTodoPage,
} from '../types/todo';
import { ensureOk } from '../utils/ensureOk';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/todos?_limit=10`, {
    method: 'GET',
  });
  ensureOk('Gagal mengambil data ', response);

  return response.json();
}

export async function createTodo(input: CreateTodoInput): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  ensureOk('Gagal membuat data ', response);

  console.log(response.json());
  return response.json();
}

export async function updateTodo(input: UpdateTodoInput): Promise<Todo> {
  const response = await fetch(`${BASE_URL}/todos/${input.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  ensureOk('Gagal mengupdate data ', response);
  const data = await response.json();
  console.log(data);
  return response.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  ensureOk('Gagal menghapus data ', response);
  const data = await response.json();
  console.log(data);
}

export async function fetchTodoPage(page: number, limit = 10): Promise<Todo[]> {
  const start = (page - 1) * limit;
  const response = await fetch(
    `${BASE_URL}/todos?_start=${start}&_limit=${limit}`,
    {
      method: 'GET',
    }
  );
  ensureOk('Gagal mengambil data ', response);

  return response.json();
}

export async function fetchInfiniteTodos(
  page: number,
  limit = 10
): Promise<InfiniteTodoPage> {
  const items = await fetchTodoPage(page, limit);
  const totalTodos = 200;

  const hasMore = page * limit < totalTodos && items.length === limit;
  return {
    items,
    nextPage: hasMore ? page + 1 : undefined,
  };
}
