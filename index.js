const { createServer } = require("http");
const { error, ping } = require("./urls/index.js");
const url = require("url");

//ahndle the environment variables
const dotenv = require("dotenv");

dotenv.config();

const server = createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);
  const { method } = req;

  const handlerPath = pathname.replace("/", "");
  const chosenHandler = handlers[handlerPath] || handlers.error;

  chosenHandler((code) => {
    res.statusCode = code;

    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message:
          "hello from the inside:\n ========" +
          pathname +
          " ======== " +
          method +
          " ======== " +
          code,
        code,
        method,
        pathname,
      })
    );
  }, {});
});

const handlers = {
  ping,
  error,
};

const port = process.env.PORT;

server.listen(port, () =>
  console.log(`server is running on port ${port} properly`)
);
