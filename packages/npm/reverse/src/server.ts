import fs from "fs/promises";
import path from "path";
import * as api from "reverse-api";
import * as shared from "shared";
import * as operationHandlers from "./operation-handlers/index.js";
import { projectRoot } from "./root.js";

main();

// entrypoint for the server
async function main() {
  // create the server
  const server = new api.Server();

  // register all operations
  server.registerOperations(operationHandlers);

  // serve a static file (will be generic middleware in the future)
  server.registerMiddleware(async (request, next) => {
    if (request.method === "GET") {
      switch (request.path) {
        case "/":
          return {
            status: 200,
            headers: {
              "content-type": "text/html",
            },
            async *stream() {
              const data = await fs.readFile(path.join(projectRoot, "public", "index.html"));
              yield data;
            },
          };

        case "/favicon.ico":
          return {
            status: 204,
            headers: {},
            async *stream() {},
          };

        case "/client.js":
          return {
            status: 200,
            headers: {
              "content-type": "application/javascript",
            },
            async *stream() {
              const data = await fs.readFile(path.join(projectRoot, "bundled", "client.js"));
              yield data;
            },
          };

        case "/client.js.map":
          return {
            status: 200,
            headers: {
              "content-type": "application/javascript",
            },
            async *stream() {
              const data = await fs.readFile(path.join(projectRoot, "bundled", "client.js.map"));
              yield data;
            },
          };
      }
    }

    const response = await next(request);
    return response;
  });

  // get port to listen to from the environment or use the default
  const port = Number(process.env.PORT ?? 8080);

  console.info(`Starting server...`);
  {
    // listen to the specified port and send requests to the server. We are
    // using the `using` syntax here, the server will be disposed (terminated)
    // at the end of the current block.
    await using listener = await api.lib.listen(server, { port });

    console.info(`Server started (${listener.port})`);

    // wait for a user to send a signal and eventually stop listening.
    await shared.waitForSignal("SIGINT", "SIGTERM");

    console.info("Stopping server...");

    // Thanks to the `using` keyword (and a proper implementation of the dispose)
    // the server is terminated here, at the end of this block.
  }
  console.info(`Server stopped`);
}
