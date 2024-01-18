const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dirname = path.join(__dirname, '02-write-file.txt');
const file = fs.createWriteStream(dirname);
const rl = readline.createInterface(process.stdin, process.stdout);

const askQuestion = () => {
  rl.question('Привет, введи текст для сохранения в файл: ', (answer) => {
    if (answer === 'exit') {
      console.log('Программа была остановлена, Удачи!');
      rl.close();
    } else {
      file.write(answer + '\n');
      askQuestion();
    }
  });
};

rl.on('SIGINT', () => {
  console.log('\nПрограмма была остановлена, Удачи!');
  rl.close();
});

askQuestion();
