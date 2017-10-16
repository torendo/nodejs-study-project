import fs from 'fs';
import util from 'util';
import through2 from 'through2';
import parseArgs from 'minimist';
import csv from 'csvjson';
import request from 'request';
import CombinedStream from 'combined-stream';

const readdirAsync = util.promisify(fs.readdir);

function inputOutput(filePath) {
  fs.createReadStream(filePath)
    .pipe(process.stdout)
    .on('error', (err) => console.error(err));
}

function transform() {
  process.stdin
    .pipe(through2(function (chunk, enc, callback) {
      const transformed = chunk.toString().toUpperCase();
      this.push(new Buffer(transformed));
      callback();
    }))
    .pipe(process.stdout)
    .on('error', (err) => console.error(err));
}

function transformFile(filePath, isToFile) {
  const stream = fs.createReadStream(filePath)
    .pipe(through2(function (chunk, enc, callback) {
      const transformed = JSON.stringify(csv.toObject(chunk.toString()));
      this.push(new Buffer(transformed));
      callback();
    }));
  if (isToFile) {
    const newFilePath = filePath.replace(/csv$/i, 'json');
    stream.pipe(fs.createWriteStream(newFilePath));
  } else {
    stream.pipe(process.stdout);
  }
  stream.on('error', (err) => console.error(err));
}

function cssBundler(path) {
  readdirAsync(path).then(files => {
    let combinedStream = CombinedStream.create();
    files.forEach(file => {
      if (!/css$/i.test(file)) return;
      const stream = fs.createReadStream(path + '/' + file)
        .pipe(through2(function (chunk, enc, callback) {
          const transformed = chunk.toString() + '\n';
          this.push(new Buffer(transformed));
          callback();
        }));
      combinedStream.append(stream);
    });
    combinedStream
      .append(request('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css'))
      .pipe(fs.createWriteStream(path + '/' + 'bundle.css'))
      .on('error', (err) => console.error(err));
  }).catch(err => console.error(err));
}

function printHelpMessage() {
  console.log(`You can use following commands:
    -a=name, --action=name    do an action: io, transform, transform-file, transform-file-to-file, bundle-css
    -f=name, --file=name      provide a file for processing with 'io', 'transform-file' and 'transform-file-to-file' actions
    -p=name, --path=name      provide a path for using with 'bundle-css' action
    -h, --help                show this message`);
  process.exit();
}

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    help: 'h',
    action: 'a',
    file: 'f',
    path: 'p',
  }
});
if (argv.help) {
  printHelpMessage();
}
if (argv.action) {
  switch (argv.action) {
    case 'io':
      if (argv.file) inputOutput(argv.file);
      else console.log('You should specify a file option.');
      break;
    case 'transform':
      transform();
      break;
    case 'transform-file':
      if (argv.file) transformFile(argv.file);
      else console.log('You should specify a file option.');
      break;
    case 'transform-file-to-file':
      if (argv.file) transformFile(argv.file, true);
      else console.log('You should specify a file option.');
      break;
    case 'bundle-css':
      if (argv.path) cssBundler(argv.path);
      else console.log('You should specify a path option.');
      break;
    default:
      console.log('Unknown action: ', argv.action);
      printHelpMessage();
  }
} else {
  console.log('Wrong usage.');
  printHelpMessage();
}

export {
  inputOutput,
  transform,
  transformFile,
  cssBundler,
};