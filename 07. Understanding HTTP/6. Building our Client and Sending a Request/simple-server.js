const http = require('node:http');

const server = http.createServer();

server.on('request', (request, response) => {
  console.log('--------- METHOD: ---------');
  console.log(request.method);

  console.log('--------- URL: ---------');
  console.log(request.url);

  console.log('--------- HEADERS: ---------');
  console.log(request.headers);

  const name = request.headers.name;

  console.log('--------- BODY: ---------');

  let data = '';

  request.on('data', (chunk) => {
    data += chunk.toString();
    console.log(data);
  });

  request.on('end', () => {
    data = JSON.parse(data);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(
      JSON.stringify({
        message: `Post with title ${data.title} was created by ${name}`,
      })
    );
  });
});

server.listen(8050, () => {
  console.log('Server listening on http://localhost:8050');
});

/*
0000   50 4f 53 54 20 2f 63 72 65 61 74 65 2d 70 6f 73   POST /create-pos
0010   74 20 48 54 54 50 2f 31 2e 31 0d 0a 43 6f 6e 74   t HTTP/1.1..Cont
0020   65 6e 74 2d 54 79 70 65 3a 20 61 70 70 6c 69 63   ent-Type: applic
0030   61 74 69 6f 6e 2f 6a 73 6f 6e 0d 0a 6e 61 6d 65   ation/json..name
0040   3a 20 4a 6f 65 0d 0a 48 6f 73 74 3a 20 6c 6f 63   : Joe..Host: loc
0050   61 6c 68 6f 73 74 3a 38 30 35 30 0d 0a 43 6f 6e   alhost:8050..Con
0060   6e 65 63 74 69 6f 6e 3a 20 6b 65 65 70 2d 61 6c   nection: keep-al
0070   69 76 65 0d 0a 43 6f 6e 74 65 6e 74 2d 4c 65 6e   ive..Content-Len
0080   67 74 68 3a 20 37 34 0d 0a 0d 0a                  gth: 74....
*/
