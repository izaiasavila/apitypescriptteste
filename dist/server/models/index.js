'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var config = require('../config/env/config')();
var env = config.env || 'development';
var db = {};
if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    var sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        port: 5432,
        host: 'ec2-107-22-171-11.compute-1.amazonaws.com',
        logging: true //false
    });
}
else {
    if (config.dbURL) {
        var sequelize = new Sequelize(config.dbURL);
    }
    else {
        var sequelize = new Sequelize(config.db, config.username, config.password);
    }
}
console.log(__dirname);
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    var extension = '.js';
    //if(process.env.NODE_ENV == 'development') extension = '.ts';
    var arquivo = (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === "" + extension);
    return arquivo;
})
    .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
