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

const fs = require('fs/promises');

(async () => {
  const watcher = fs.watch('./');

  for await (const event of watcher) {
    console.log('event', event);
  }
})();
