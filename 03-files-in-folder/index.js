const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'secret-folder');

fs.readdir(dirname, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    if (file.isFile()) {
      console.log(`${file.name} - ${path.extname(file.name)}`);
    }
  });
});
