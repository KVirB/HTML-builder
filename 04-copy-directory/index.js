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

fs.readdir(dirname, (err, copyFiles) => {
  if (err) {
    console.error(err);
  }

  copyFiles.forEach((copyFile) => {
    fs.readdir(dirnameCopy, (err, oldFiles) => {
      if (err) {
        console.error(err);
      }

      oldFiles.forEach((oldFile) => {
        if (!copyFiles.includes(oldFile)) {
          fs.unlink(path.join(dirnameCopy, oldFile), (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
    });
    fs.copyFile(
      `${__dirname}/files/${copyFile}`,
      `${__dirname}/files-copy/${copyFile}`,
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );
  });
  console.log('Files copied');
});
