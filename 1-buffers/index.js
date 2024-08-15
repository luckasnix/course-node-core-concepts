import { Buffer } from 'node:buffer';

// Buffer 1
const buffer1 = Buffer.alloc(4);

buffer1[0] = 0xF4;
buffer1[1] = 0x2A;
buffer1[2] = 0xCC;
buffer1[3] = 0x29;

console.log('------ Buffer 1 ------');
console.log('Length: ', buffer1.byteLength);
console.log('Hexadecimal: ', buffer1.toString('hex'));

// Buffer 2
const buffer2Items = [0x48, 0x69, 0x21];
const buffer2 = Buffer.from(buffer2Items);

console.log('------ Buffer 2 ------');
console.log('Length: ', buffer2.byteLength);
console.log('UTF-8: ', buffer2.toString('utf-8'));
