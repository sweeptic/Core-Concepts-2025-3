const http = require('node:http');

const agent = new http.Agent({ keepAlive: true });

const request = http.request({
  agent: agent,
  hostname: 'localhost',
  port: 8050,
  method: 'POST',
  path: '/create-post',
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Length': 16,
    'Content-Length': Buffer.byteLength(JSON.stringify({ message: 'Hi there!' }), 'utf-8'),
  },
});

//  'transfer-encoding': 'chunked'
// 'Content-Length': 16,

request.on('response', () => {});

request.write(JSON.stringify({ message: 'Hi there!' }));
request.write(JSON.stringify({ message: 'Hi there 2!' }));
request.write(JSON.stringify({ message: 'Hi there 3!' }));

request.end(JSON.stringify({ message: 'Hi there 4!' }));
