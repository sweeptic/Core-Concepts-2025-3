import { createServer } from 'node:http';

const server = createServer();

server.on('request', (req, res) => {
  console.log('url', req.url);
  console.log('method', req.method);
  console.log('------------');

  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({ hello: 'abc' }));
  res.end();
});

server.listen(9000, () => {
  console.log('web server is live at http://localhost:9000');
});
