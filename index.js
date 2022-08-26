const { createServer } = require("http");

const server = createServer((req, res) => {
  res.end("hello from the inside\n");
});

const port = 3000;

server.listen(port, () =>
  console.log(`server is running on port ${port} properly`)
);
