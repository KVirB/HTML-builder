const fs = require('fs');
const path = require('path');

const dirnameCopy = path.join(__dirname, 'files-copy');
const dirname = path.join(__dirname, 'files');

fs.stat(dirnameCopy, (err) => {
  if (err) {
    fs.mkdir(dirnameCopy, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Created directory files-copy');
    });
  }
});

fs.readdir(dirnameCopy, (err, files) => {
  if (err) {
    console.error(err);
  }
  files.forEach((file) => {
    fs.unlink(path.join(dirnameCopy, file), (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
});

fs.readdir(dirname, (err, files) => {
  if (err) {
    console.error(err);
  }
  files.forEach((file) => {
    fs.copyFile(
      `${__dirname}/files/${file}`,
      `${__dirname}/files-copy/${file}`,
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );
  });
  console.log('Files copied');
});
