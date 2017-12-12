import mongoose from "mongoose";
import configApp from '../config/index.json';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
module.exports = app; // for testing

const config = {
  appRoot: __dirname,
  swaggerSecurityHandlers: {
    jwt_auth: function (req, authOrSecDef, scopesOrApiKey, cb) {
      if ('1234' === scopesOrApiKey) {
        cb(true);
      } else {
        cb(new Error('access denied!'));
      }
    }
  }
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  swaggerExpress.register(app);

  mongoose.Promise = global.Promise;
  mongoose.connect(configApp.dbUrl, {
    useMongoClient: true
  }, () => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  });
});
