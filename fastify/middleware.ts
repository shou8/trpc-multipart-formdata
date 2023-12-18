import { middleware } from "./trpc";
import {
  experimental_createMemoryUploadHandler,
  experimental_isMultipartFormDataRequest,
  experimental_parseMultipartFormData,
} from "@trpc/server/adapters/node-http/content-type/form-data";

export const formDataMiddleware = middleware(async ({ ctx, next }) => {
  if (!experimental_isMultipartFormDataRequest(ctx.req.raw)) {
    throw new Error("Invalid content type (not multipart/form-data)");
  }

  const formData = await experimental_parseMultipartFormData(ctx.req.raw, experimental_createMemoryUploadHandler());

  return next({
    rawInput: formData,
  });
});
