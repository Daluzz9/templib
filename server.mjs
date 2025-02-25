import { createServer } from "node:http";
import { handler } from "./.output/server/index.mjs";
import apm from "elastic-apm-node";

const PORT = process.env.APP_PORT || 3000;

(() => {
  try {
    if (process.env.ELASTIC_APM_SERVER_URL && !apm.isStarted()) {
      console.log("Elastic APM Initialized");

      apm.start({
        serviceName: "prod_fe_bu88",
        serverUrl: process.env.ELASTIC_APM_SERVER_URL,
        secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
        environment: process.env.APP_ENV,
      });
    }

    const server = createServer(handler);
    server.listen(PORT, () => {
      console.log(`Server listen on port: ${PORT}`);
    });

    server.on("request", (req) => {
      const { method, url } = req;
      console.log(`${method}: ${url}`);
    });

    server.keepAliveTimeout = process.env.KEEP_ALIVE_TIMEOUT ? Number(process.env.KEEP_ALIVE_TIMEOUT) : 61000;
    server.headersTimeout = process.env.HEADERS_TIMEOUT ? Number(process.env.HEADERS_TIMEOUT) : 62000;
  } catch (error) {
    console.error("Error loading Nuxt:", error);
    process.exit(1);
  }
})();
