const { createServer } = require("http");
const url = require("url");

//ahndle the environment variables
const dotenv = require("dotenv");

dotenv.config();

const server = createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);
  const { method } = req;

  const handlerPath = pathname.replace("/", "");
  const chosenHandler = handlers[handlerPath] || handlers.error;

  chosenHandler({}, (code) => {
    res.statusCode = code;
    if (code !== 404) {
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message:
            "hello from the inside:\n ========" +
            pathname +
            " ======== " +
            method +
            "========" +
            code,
          code,
          method,
          pathname,
        })
      );
    } else {
      res.end();
    }
  });
});

const handlers = {
  ping: (data, callback) => {
    callback(200);
  },
  error: (_, callback) => {
    callback(404);
  },
};

const port = process.env.PORT;

server.listen(port, () =>
  console.log(`server is running on port ${port} properly`)
);
