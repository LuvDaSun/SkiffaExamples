import fs from "fs/promises";
import * as api from "reverse-api";

// all of this should move to oa42-lib

export interface ServeConfiguration {
  [path: string]:
    | {
        path: string;
        contentType: string;
      }
    | false;
}

/**
 * Middleware to serve static files from the file system. Very useful for debugging.
 *
 * @param configuration configuration of the static files to serve
 * @returns middleware
 */
export function serve(configuration: ServeConfiguration): api.lib.ServerMiddleware {
  return async (request, next) => {
    if (request.method === "GET") {
      const pathConfiguration = configuration[request.path];
      if (pathConfiguration === false) {
        return {
          status: 204,
          headers: {},
          async *stream() {},
        };
      }

      if (pathConfiguration != null) {
        return {
          status: 200,
          headers: {
            "content-type": pathConfiguration.contentType,
          },
          async *stream() {
            const data = await fs.readFile(pathConfiguration.path);
            yield data;
          },
        };
      }
    }

    const response = await next(request);
    return response;
  };
}
