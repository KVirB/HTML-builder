const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(dirname, 'utf8');

readStream.on('data', (data) => {
  console.log(data);
});
