const fs = require('fs/promises');

(async () => {
  const fileHandleRead = await fs.open('test.txt', 'r');
  const fileHandleWrite = await fs.open('dest.txt', 'w');

  const streamRead = fileHandleRead.createReadStream({ highWaterMark: 65536 });
  const streamWrite = fileHandleWrite.createWriteStream();

  streamRead.on('data', (chunk) => {
    // console.log('chunk', chunk);
    // console.log('default high watermark: ', chunk.length);

    // console.log('----');

    // streamWrite.write(chunk);
    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }
  });

  streamWrite.on('drain', () => {
    streamRead.resume();
    console.log('drain');
  });

  streamWrite.on('finish', () => {
    console.log('FINISH');
  });
})();
