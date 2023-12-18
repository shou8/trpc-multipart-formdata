import { DataTransformerOptions, initTRPC } from '@trpc/server';
import { Context } from './context';
import superjson, { SuperJSONResult } from 'superjson';

const transformer: DataTransformerOptions = {
  serialize: superjson.serialize,
  deserialize: (data: never) => {
    const payload: SuperJSONResult = data ?? { json: null };
    return superjson.deserialize(payload);
  },
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({ transformer });

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
