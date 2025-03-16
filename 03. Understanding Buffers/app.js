const { Buffer } = require('buffer');

// 0000 0000
// 0000 0000
// 0000 0000
// 0000 0000

// 4bytes 32 bit. have four element
const memoryContainer = Buffer.alloc(4);

memoryContainer[0] = 0x48;
memoryContainer[1] = 0x69;
// memoryContainer.writeInt8(-34, 2);
memoryContainer[2] = 0x21;

// console.log('memoryContainer', memoryContainer);
// console.log('memoryContainer[0]', memoryContainer[0]);
// console.log('memoryContainer[0]', memoryContainer[1]);
// console.log('memoryContainer[0]', memoryContainer.readInt8(2));
// console.log('memoryContainer[0]', memoryContainer[3]);

// console.log('hex', memoryContainer.toString('utf-8'));

// console.log(memoryContainer.toString('utf-8'));

// const buff = Buffer.from([0x48, 0x69, 0x21]);
// console.log(buff.toString('utf-16le'));

const buff = Buffer.from('string', 'utf-8');

console.log('buff', buff);
