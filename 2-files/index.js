import { open, watch, writeFile, unlink, rename } from 'node:fs/promises';

const createFile = async (path, data) => {
  try {
    await writeFile(path, data);
    console.log('File created successfully.');
  } catch {
    console.error('Unable to create the file.');
  }
};

const deleteFile = async (path) => {
  try {
    await unlink(path);
    console.log('File deleted successfully.');
  } catch {
    console.error('Unable to delete the file.');
  }
};

const renameFile = async (oldPath, newPath) => {
  try {
    await rename(oldPath, newPath);
    console.log('File renamed successfully.');
  } catch {
    console.error('Unable to rename the file.');
  }
};

const fileHandle = await open('./2-files/command.txt', 'r');

fileHandle.on('change', async () => {
  const { size } = await fileHandle.stat();
  const buffer = Buffer.alloc(size);
  await fileHandle.read(buffer, 0, buffer.byteLength, 0);
  const fileContent = buffer.toString('utf8');
  const [fileCommand, ...fileParams] = fileContent.split('|');
  switch (fileCommand) {
    case 'create':
      await createFile(fileParams[0], fileParams[1]);
      break;
    case 'delete':
      await deleteFile(fileParams[0]);
      break;
    case 'rename':
      await renameFile(fileParams[0], fileParams[1]);
      break;
    default:
      console.error('Unknow command.');
      break;
  }
});

const fileWatcher = watch('./2-files/command.txt');

for await (const event of fileWatcher) {
  if (event.eventType === 'change') {
    fileHandle.emit('change');
  }
}
