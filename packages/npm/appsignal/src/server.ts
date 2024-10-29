import "./appsignal.js";

import * as api from "noop-api";
import * as shared from "shared";
import * as operationHandlers from "./operation-handlers.js";

main();

// entrypoint for the server
async function main() {
  // create the server
  const server = new api.server.Server();

  // register all operations
  server.registerOperations(operationHandlers);

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
