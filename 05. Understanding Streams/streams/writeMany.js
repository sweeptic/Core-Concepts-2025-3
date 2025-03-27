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
//
//
//

// callback version
// writeMany: 3.828s sync
// writeMany: 2.672s
// writeMany: 4.379s sync with buff
// writeMany: 2.740s sync with buff

const fs = require('fs');

(() => {
  console.time('writeMany');
  fs.open('./test.txt', 'w', (err, fd) => {
    for (let index = 0; index < 1000000; index++) {
      const buff = Buffer.from(` ${index}`, 'utf-8');
      fs.write(fd, buff, () => {});
    }
    console.timeEnd('writeMany');
  });
})();
