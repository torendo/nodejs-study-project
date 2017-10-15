import fs from 'fs';
import through2 from 'through2';
import parseArgs from 'minimist';
import csv from 'csvjson';

function inputOutput (filePath) {
  if (!fs.existsSync(filePath)) {
    return console.error('File does not exist', filePath);
  }
  fs.createReadStream(filePath)
    .pipe(process.stdout)
    .on('error', (err) => console.error(err));
}

function transform () {
  process.stdin
    .pipe(through2(function (chunk, enc, callback) {
      const transformed = chunk.toString().toUpperCase();
      this.push(new Buffer(transformed));
      callback();
    }))
    .pipe(process.stdout)
    .on('error', (err) => console.error(err));
}

function transformFile (filePath, isToFile) {
  if (!fs.existsSync(filePath)) {
    return console.error('File does not exist', filePath);
  }
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

function cssBundler (path) {
  // Grab all css files in given path

  // Contact them into one big css file


  // Add contents of https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd2 47a91c7e26a15.css at the bottom of this big css
  // Output should be saved in the same path and called bundle.css
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