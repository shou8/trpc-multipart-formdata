import { inferAsyncReturnType } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

export const createContext = async ({ req, res }: CreateHTTPContextOptions) => {
  return { req, res };
}
  
export type Context = inferAsyncReturnType<typeof createContext>;
