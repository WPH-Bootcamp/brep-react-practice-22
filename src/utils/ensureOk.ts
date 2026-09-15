export async function ensureOk(message: string, response: Response) {
  if (!response.ok) {
    throw new Error(`${message}: ${response.status}`);
  }

  return response;
}
