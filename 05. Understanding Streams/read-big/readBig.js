const fs = require('fs/promises');

(async () => {
  const fileHandleRead = await fs.open('test.txt', 'r');
  const fileHandleWrite = await fs.open('dest.txt', 'w');

  const streamRead = fileHandleRead.createReadStream({ highWaterMark: 65536 });
  const streamWrite = fileHandleWrite.createWriteStream();

  let split = '';

  streamRead.on('data', (chunk) => {
    const numbers = chunk.toString('utf-8').split(' ');
    console.log('chunk', chunk);
    console.log('numbers', numbers);
    console.log('---------------------');

    if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
      if (split) {
        numbers[0] = split.trim() + numbers[0].trim();
      }
    }

    if (Number(numbers[numbers.length - 2]) + 1 !== Number(numbers[numbers.length - 1])) {
      split = numbers.pop();
    }

    // console.log('numbers', numbers);

    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }
  });

  streamWrite.on('drain', () => {
    streamRead.resume();
    console.log('drain');
  });
})();
