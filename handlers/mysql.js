const Keyv = require('keyv');
const config = require('../handlers/sync').syncconfig().config;

module.exports = {

    getmysqldb: function getmysqldb() {

        const database = new Keyv('mysql://${config.database.mysql.username}:${config.database.mysql.password}@${config.database.mysql.host}/${config.database.mysql.database}');
        return database;
    }
}