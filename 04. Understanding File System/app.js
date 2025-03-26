// const fs = require('fs');

// const content = fs.readFileSync('./text.txt');

// console.log('content', content);

// Some random text

//   decimal  hexadecimal
// -------------------------
// S 00111111   53
// o 11100011   6f
// m 10011001   6d
// e 11001100   65

// BUFFER 4 byte = 32 bit
//     00000000   8bit      0-127 1piece ASCII character encoding with UTF-8
//     00000000   8bit      0-127
//     00000000   8bit      0-127
//     00000000   8bit      0-127

{
  /* <Buffer 
     53 6f 6d 65 -----> 1 BUFFER

     20 72 61 6e 

     64 6f 6d 20 

     74 65 78 74
     
     21
     > */
}

// console.log('content in utf-8', content.toString('utf-8'));

// open
// read

const fs = require('fs/promises');

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');

  commandFileHandler.on('change', async () => {
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);
    const offset = 0;
    const length = buff.byteLength;
    const position = 0;
    const content = await commandFileHandler.read(buff, offset, length, position);
    console.log('content', content);
  });

  // watcher
  const watcher = fs.watch('./command.txt');
  for await (const event of watcher) {
    commandFileHandler.emit('change');
  }
})();
