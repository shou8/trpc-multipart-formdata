import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export const createContext = async ({ req, res }: CreateFastifyContextOptions) => {
  return { req, res };
}
export type Context = Awaited<ReturnType<typeof createContext>>;