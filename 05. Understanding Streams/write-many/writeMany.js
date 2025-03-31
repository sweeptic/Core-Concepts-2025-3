// WRITE
// // writeMany: 25.919s
// const fs = require('fs/promises');
// (async () => {
//   const commandFileHandler = await fs.open('./test.txt', 'w');
//   const createFile = async (path) => {
//       console.time('writeMany');
//       await fs.writeFile(path, '');
//       for (let index = 0; index < 1000000; index++) {
//         await commandFileHandler.write(` ${index}`);
//       }
//       console.timeEnd('writeMany');
//   };
//   commandFileHandler.on('write', async () => {
//     const filePath = './test.txt';
//     createFile(filePath);
//   });
//   commandFileHandler.emit('write');
// })();

// callback version
// writeMany: 3.828s sync
// writeMany: 2.672s
// WRITESYNC
// const fs = require('fs');
// (() => {
//   console.time('writeMany');
//   fs.open('./test.txt', 'w', (err, fd) => {
//     for (let index = 0; index < 1000000; index++) {
//       const buff = Buffer.from(` ${index}`, 'utf-8');
//       fs.writeSync(fd, buff);
//     }
//     console.timeEnd('writeMany');
//   });
// })();

// WRITE
// callback version
// writeMany: 3.828s sync
// writeMany: 2.672s
// const fs = require('fs');
// (() => {
//   console.time('writeMany');
//   fs.open('./test.txt', 'w', (err, fd) => {
//     for (let index = 0; index < 1000000; index++) {
//       const buff = Buffer.from(` ${index}`, 'utf-8');
//       fs.write(fd, buff, () => {});
//     }
//     console.timeEnd('writeMany');
//   });
// })();

// const fs = require('fs/promises');
// // writeMany: 322.561ms !!!!!!!!!!!!!!!!!!!!!!!
// // DO  NOT DO THIS WAY
// (async () => {
//   const commandFileHandler = await fs.open('./test.txt', 'w');
//   const createFile = async () => {
//     console.time('writeMany');
//     const stream = commandFileHandler.createWriteStream();
//     for (let index = 0; index < 1000000; index++) {
//       const buff = Buffer.from(` ${index}`, 'utf-8');
//       stream.write(buff);
//     }
//     console.timeEnd('writeMany');
//   };
//   commandFileHandler.on('write', async () => {
//     createFile();
//   });
//   commandFileHandler.emit('write');
// })();

// USING STREAM

// const fs = require('fs/promises');

//   console.time('writeMany');
// const filehandle = await fs.open('test.txt', 'w');

// const stream = filehandle.createWriteStream();

// 16384 Byte
// 16 KByte
// 0.016 MB

//   console.log('writableHighWaterMark: ', stream.writableHighWaterMark);

//   const buff = Buffer.alloc(65535, 10);

//   console.log(buff);

//   const size = stream.write(buff);
//   console.log(stream.write(buff));
//   console.log(stream.write(Buffer.alloc(1, 'a')));
//   console.log(stream.write(Buffer.alloc(1, 'a')));
//   //   console.log(stream.write(Buffer.alloc(1, 'a')));
//   //   stream.write(Buffer.alloc(67541, 'a'));
//   //   console.log(stream.write(Buffer.alloc(67541, 'a')));
//   console.log(stream.write(Buffer.alloc(1, 'a')));
//   console.log(stream.write(Buffer.alloc(1, 'a')));
//   //   console.log(stream.write(Buffer.alloc(65541, 'a')));
//   console.log(stream.write(Buffer.alloc(1, 'a')));
//   console.log(stream.write(Buffer.alloc(1, 'a')));

//   console.log('writableLength: ', stream.writableLength);

//   stream.on('drain', () => {
//     console.log(stream.write(Buffer.alloc(1, 'a')));
//     // console.log(stream.write(Buffer.alloc(65541, 'a'))); INFINITE LOOP
//     // console.log(stream.write(Buffer.alloc(1, 'a')));
//     // console.log(stream.write(Buffer.alloc(1, 'a')));
//     // console.log(stream.write(Buffer.alloc(1, 'a')));

//     console.log('writableLength: ', stream.writableLength);
//     console.log('we are now safe to write more!');
//   });

//   setInterval(() => {}, 1000);

//   filehandle.close();

//   stream.write(buff);

//   console.log('buff', buff);
//   stream.write(buff);
//   stream.write(buff);
//   stream.write(buff);
//   stream.write(buff);
//   stream.write(buff);

//   console.log('writableLength: ', stream.writableLength);

const fs = require('fs/promises');

(async () => {
  const filehandle = await fs.open('test.txt', 'w');
  const stream = filehandle.createWriteStream();

  let index = 0;
  let drainedNum = 0;

  const numberOfWrites = 1000000;

  function writeMany() {
    for (index; index < numberOfWrites; index++) {
      const buff = Buffer.from(` ${index}`, 'utf-8');
      const size = stream.write(buff);

      if (index === numberOfWrites - 1) {
        // console.log('drainedNum: ', drainedNum);
        stream.end(buff);
        // stream.write('abc');  ERROR
      }

      if (!size) {
        // console.log('Drain at: ', index);
        break;
      }
    }
  }

  writeMany();

  stream.on('drain', () => {
    // console.log('DRAIN DONE');
    // console.log('writableLength: ', stream.writableLength);
    drainedNum++;
    writeMany();
  });

  stream.on('finish', () => {
    console.log('FINISH');
  });
})();
