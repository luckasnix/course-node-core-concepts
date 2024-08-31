import { open } from 'node:fs/promises';

const sourceFileHandle = await open('./3-streams/source.txt', 'r');
const targetFileHandle = await open('./3-streams/target.txt', 'w');

const readableStream = sourceFileHandle.createReadStream({ highWaterMark: 1 });
const wriatableStream = targetFileHandle.createWriteStream({ highWaterMark: 1 });

readableStream.on('data', (chunk) => {
  if (!wriatableStream.write(chunk)) {
    readableStream.pause();
  }
});

wriatableStream.on('drain', () => {
  readableStream.resume();
});
