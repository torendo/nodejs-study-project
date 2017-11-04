import http from 'http';
import fs from 'fs';
import through2 from 'through2';

const file = './http-servers/index.html';

function templater(template, object) {
  return template.replace(/{([^}]+)}/g, (match, p) => p && object[p] ? object[p] : '');
}

http.createServer()
  .on('request', (req, res) => {
    const {url, method} = req;
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    if (url === '/sync') {
      //e. Read (readFileSync) an index.html file with fs module, replace message with real message text.
      let content = fs.readFileSync(file, 'utf8');
      const transformed = templater(content, {url, method});
      res.end(transformed);
    } else if (url === '/stream') {
      //g. Change readFileSync to be a readable stream and pipe it to response stream.
      fs.createReadStream(file)
        .pipe(through2(function (chunk, enc, callback) {
          const transformed = templater(chunk.toString(), {url, method});
          this.push(new Buffer(transformed));
          callback();
        }))
        .pipe(res);
    } else {
      res.end('Please navigate to /sync or /stream');
    }
  })
  .listen(3000);