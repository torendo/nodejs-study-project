//It should be able to listen to DirWatcher events and start import csv files on ‘dirwatcher:changed’ event.
import fs from 'fs';
import util from 'util';
import DirWatcher from '../dirwatcher';

const readFileAsync = util.promisify(fs.readFile);

export default class Importer {
  constructor(path, delay) {
    const dirWatcher = new DirWatcher();
    dirWatcher.watch(path, delay);
    dirWatcher.on('changed', (files) => {
      new Promise.all(files.map(file => this.importAsync(file))).then((data) => {
        console.log(data)
      })
    });
    dirWatcher.on('changed', (files) => {
      files.forEach((file) => {
        let data = this.importSync(file);
        console.log(data);
      })
    });
  }
  importAsync(path) {
    //should be able to return promise with imported data
    return async (file) => {
      try {
        await readFileAsync(path + '/' + file);
      } catch (err) {
        throw err;
      }
    };
  }
  importSync(path) {
    fs.readFileSync(path, (err, data) => {
      if (err) throw err;
      return data;
    });
    //is synchronous and should be able to return all imported data
  }
  //All imported data should have a json format
};