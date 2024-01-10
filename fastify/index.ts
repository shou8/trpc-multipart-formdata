import { FastifyTRPCPluginOptions, fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { zfd } from 'zod-form-data'; 
import { publicProcedure, router } from './trpc';
import { formDataMiddleware } from './middleware';
import { createContext } from './context';
import { nodeHTTPFormDataContentTypeHandler } from '@trpc/server/adapters/node-http/content-type/form-data';
import { nodeHTTPJSONContentTypeHandler } from '@trpc/server/adapters/node-http/content-type/json';
import { z } from 'zod';
import * as multipart from '@fastify/multipart';

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

const server = fastify({
  maxParamLength: 5000,
});

server.register(multipart);

server.register(fastifyTRPCPlugin, {
  trpcOptions: {
    router: appRouter,
    createContext,
    experimental_contentTypeHandlers: [
      nodeHTTPFormDataContentTypeHandler(),
      nodeHTTPJSONContentTypeHandler(),
    ],
  } // satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});

(async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();