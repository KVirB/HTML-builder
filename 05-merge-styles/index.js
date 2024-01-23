const fs = require('fs');
const path = require('path');

const dirnameBundle = path.join(__dirname, 'project-dist/bundle.css');
const dirname = path.join(__dirname, 'styles');
const file = fs.createWriteStream(dirnameBundle);

fs.readdir(dirname, (err, styles) => {
  if (err) {
    console.error(err);
  }
  styles.forEach((style) => {
    if (style.split('.')[1] === 'css') {
      const dirnameStyle = path.join(__dirname, `styles/${style}`);
      const readStream = fs.createReadStream(dirnameStyle);

      readStream.on('data', (data) => {
        file.write(data + '\n');
      });
    }
  });
  console.log('Bundle.css generate');
});
