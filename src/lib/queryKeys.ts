export const todoKeys = {
  all: ['todos'] as const,
  list: () => [...todoKeys.all, 'list'],
  page: (page: number, limit: number) =>
    [...todoKeys.all, 'page', { page: page, limit: limit }] as const,
  infinite: () => [...todoKeys.all, 'infinte'] as const,
};
