import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { zfd } from 'zod-form-data'; 
import { publicProcedure, router } from './trpc';
import { formDataMiddleware } from './middleware';
import { createContext } from './context';
import { nodeHTTPFormDataContentTypeHandler } from '@trpc/server/adapters/node-http/content-type/form-data';
import { nodeHTTPJSONContentTypeHandler } from '@trpc/server/adapters/node-http/content-type/json';
import { z } from 'zod';

const undici = require('undici'); 
globalThis.File = undici.File as any; 

const schema = zfd.formData({
  file: zfd.file(),
});

const appRouter = router({
  echo: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async (opts) => {
      return opts.input;
    }),

  upload: publicProcedure.use(formDataMiddleware)
    .input(schema)
    .mutation(async (_opts) => {
      return { message: "OK" };
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext,
  experimental_contentTypeHandlers: [
    nodeHTTPFormDataContentTypeHandler(),
    nodeHTTPJSONContentTypeHandler(),
  ],
});

server.listen(3000);
