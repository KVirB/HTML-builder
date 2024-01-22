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
      const filePath = path.join(dirname, file.name);
      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(
          `${file.name.split('.')[0]} - ${path
            .extname(file.name)
            .replace('.', '')} - ${stat.size / 1000}kb`,
        );
      });
    }
  });
});
