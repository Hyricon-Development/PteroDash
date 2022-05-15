"use strict";

const Keyv = require('keyv');
const config = require('../handlers/sync').syncconfig();
const chalk = require('chalk');

module.exports = {

    getdatabase: () => {
    
    const database = new Keyv(`${config.database.select}://${config.database.select == "mysql" ? `${config.database.connection.username}:${config.database.connection.password}@${config.database.connection.host}:${config.databass.connection.port}/${config.database.connection.database}` : ''}${config.database.select == "redis" ? `${config.database.connection.username}:${config.database.connection.password}@${config.database.connection.host}:${config.databass.connection.port}` : ''}${config.database.select == "postgresql" ? `${config.database.connection.username}:${config.database.connection.password}@${config.database.connection.host}:${config.databass.connection.port}/${config.database.connection.database}` : ''}${config.database.select == "mongodb" ? `${config.database.connection.username}:${config.database.connection.password}@${config.database.connection.host}:${config.databass.connection.port}/${config.database.connection.database}` : ''}${config.database.select == "etcd" ? `${config.database.connection.host}:${config.databass.connection.port}` : ''}${config.database.select == "sqlite" ? 'db.sqlite' : ''}`);

    database.on('error', () => {
        console.log(chalk.red("[PteroDash] An error has occured while trying to access database"));
      });

    return database;
  }
};