import fs from 'fs';
import EventEmitter from 'events';

export default class DirWatcher extends EventEmitter {
  watch(path, delay) {
    let oldFiles = [];
    this.interval = setInterval(() => {
      fs.readdir(path, (err, files) => {
        if (err) throw err;
        if (oldFiles.length !== files.length || JSON.stringify(oldFiles) !== JSON.stringify(files)) {
          this.emit('changed', files);
        }
        oldFiles = files;
      });
    }, delay);
    return this;
  }
};