import fs from 'fs';
import EventEmitter from 'events';
import { debounce } from './helpers';

export default class DirWatcher extends EventEmitter {
  watch(path, delay) {
    this.watcher = fs.watch(path, debounce(() => {
      this.emit('changed');
    }, delay));
    return this;
  }
};