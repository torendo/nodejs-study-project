import config from './config';
import {User, Product} from './models';
import Importer from './importer';

console.log(config.name);
let user = new User();
let product = new Product();

let importer = new Importer('./data', 1000);