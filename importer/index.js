import fs from 'fs';
import util from 'util';
import csv from 'csvjson';
import DirWatcher from '../dirwatcher';

const readFileAsync = util.promisify(fs.readFile);

export default class Importer {
  constructor(path, delay) {
    this.path = path;
    this.dirWatcher = new DirWatcher();
    this.dirWatcher
      .watch(path, delay)
      .on('changed', files => {
        this.importAsync(files).then(data => {
          console.log('importAsync:\n', data);
        });
      }).on('changed', files => {
        let data = this.importSync(files);
        console.log('importSync:\n', data);
      });
  }
  importAsync(files) {
    return Promise.all(files.map(async file => {
      let content;
      try {
        content = await readFileAsync(this.path + '/' + file, 'utf8');
      } catch (err) {
        throw err;
      }
      return csv.toObject(content);
    }));
  }
  importSync(files) {
    return files.map(file => {
      let content = fs.readFileSync(this.path + '/' + file, 'utf8', err => {
        if (err) throw err;
      });
      return csv.toObject(content);
    });
  }
};