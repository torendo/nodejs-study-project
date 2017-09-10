const config = require('./config');
const models = require('./models');

console.log(config.name);
let user = new models.User();
let product = new models.Product();
