import fs from 'fs';
import util from 'util';
import csv from 'csvjson';
import { DirWatcher } from '../utils';

const readFileAsync = util.promisify(fs.readFile);
const readdirAsync = util.promisify(fs.readdir);

export default class Importer {
  constructor(path, delay) {
    this.dirWatcher = new DirWatcher();
    this.dirWatcher
      .watch(path, delay)
      .on('changed', () => {
        this.importAsync(path).then(data => {
          console.log('importAsync:\n', data);
        });
      }).on('changed', () => {
        let data = this.importSync(path);
        console.log('importSync:\n', data);
      });
  }
  async importAsync(path) {
    return await readdirAsync(path).then((files) =>
      Promise.all(files.map(async file => {
        const filePath = path + '/' + file;
        if (fs.existsSync(filePath)) {
          let content;
          try {
            content = await readFileAsync(filePath, 'utf8');
          } catch (err) {
            throw err;
          }
          return csv.toObject(content);
        }
      }))
    );
  }
  importSync(path) {
    return fs.readdirSync(path).map(file => {
      const filePath = path + '/' + file;
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8', err => {
          if (err) throw err;
        });
        return csv.toObject(content);
      }
    });
  }
};