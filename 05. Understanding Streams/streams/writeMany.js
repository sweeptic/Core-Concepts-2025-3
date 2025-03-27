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

const fs = require('fs/promises');
// writeMany: 322.561ms !!!!!!!!!!!!!!!!!!!!!!!
// DO  NOT DO THIS WAY
(async () => {
  const commandFileHandler = await fs.open('./test.txt', 'w');
  const createFile = async () => {
    console.time('writeMany');
    const stream = commandFileHandler.createWriteStream();
    for (let index = 0; index < 1000000; index++) {
      const buff = Buffer.from(` ${index}`, 'utf-8');
      stream.write(buff);
    }
    console.timeEnd('writeMany');
  };
  commandFileHandler.on('write', async () => {
    createFile();
  });
  commandFileHandler.emit('write');
})();
