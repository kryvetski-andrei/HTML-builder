const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'text.txt');
const readline = require('readline');
const process = require('process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Your text, please > ',
});

fs.writeFile(filePath, 'Your Text: ', (error) => {
  error ? 
    console.log(error) : 
    (
      console.log(
        '\x1b[36m',
        'Holla:) File text.txt created, and You may enter your text below',
        '\x1b[0m'
      ),
      rl.prompt()
    );
});

rl.on('line', (line) => {
  switch (line) {
    case 'exit':
      console.log('Have a great day!');
      process.exit(0);
    default:
      fs.appendFile(filePath, `\n${line}`, () => {});
      console.log(
        '\x1b[32m',
        'Your text',
        '\x1b[36m',
        `${line}`,
        '\x1b[0m',
        '\x1b[32m',
        'added to text.txt file',
        '\x1b[0m'
      );
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a good day :)');
  process.exit(0);
});
