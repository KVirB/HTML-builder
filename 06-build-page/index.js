const fs = require('fs');
const path = require('path');

const dirnameDist = path.join(__dirname, 'project-dist');
const dirnameStyle = path.join(dirnameDist, 'style.css');
const dirnameStyles = path.join(__dirname, 'styles');
const dirnameComponents = path.join(__dirname, 'components');
const dirnameAssets = path.join(__dirname, 'assets');
const dirnameAssetsCopy = path.join(dirnameDist, 'assets');

fs.stat(dirnameDist, (err) => {
  if (err) {
    fs.mkdir(dirnameDist, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Created directory files-copy');
    });
  }

  function copyFolder(assets, assetsCopy) {
    fs.mkdir(assetsCopy, { recursive: true }, (err) => {
      if (err) throw err;

      fs.readdir(assets, { withFileTypes: true }, (err, files) => {
        if (err) throw err;

        files.forEach((file) => {
          const assetsDir = path.join(assets, file.name);
          const assetsCopyDir = path.join(assetsCopy, file.name);

          if (file.isDirectory()) {
            copyFolder(assetsDir, assetsCopyDir);
          } else {
            fs.copyFile(assetsDir, assetsCopyDir, (err) => {
              if (err) throw err;
            });
          }
        });
      });
    });
  }

  copyFolder(dirnameAssets, dirnameAssetsCopy);

  const styleFiles = fs.createWriteStream(dirnameStyle);
  fs.readdir(dirnameStyles, (err, styles) => {
    if (err) {
      console.error(err);
    }
    styles.forEach((style) => {
      if (style.split('.')[1] === 'css') {
        const dirnameStyle = path.join(__dirname, `styles/${style}`);
        const readStream = fs.createReadStream(dirnameStyle);

        readStream.on('data', (data) => {
          styleFiles.write(data + '\n');
        });
      }
    });
    console.log('style.css generate');
  });

  fs.readFile('06-build-page/template.html', 'utf-8', (err, template) => {
    if (err) {
      console.error(err);
    }
    let modifiedHTML = template;
    fs.readdir(
      dirnameComponents,
      { withFileTypes: true },
      (err, components) => {
        if (err) {
          console.error(err);
        }
        let componentsProcessed = 0;
        components.forEach((component) => {
          if (component.name.split('.')[1] === 'html') {
            const dirnameIndex = path.join(
              __dirname,
              `components/${component.name}`,
            );
            const readStream = fs.createReadStream(dirnameIndex);

            readStream.on('data', (data) => {
              modifiedHTML = modifiedHTML.replace(
                `{{${component.name.split('.')[0]}}}`,
                data,
              );
            });

            readStream.on('end', () => {
              componentsProcessed++;
              if (componentsProcessed === components.length) {
                fs.writeFile(
                  path.join(dirnameDist, 'index.html'),
                  modifiedHTML,
                  'utf-8',
                  (err) => {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log('index.html generated');
                    }
                  },
                );
              }
            });
          }
        });
      },
    );
  });
});
