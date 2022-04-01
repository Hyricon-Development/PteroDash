"use strict";

const Keyv = require('keyv');
const config = require('../handlers/sync').syncconfig().config;

let host = config.databases.connection.host;
let port = config.databases.connection.port;
let username = config.databases.connection.username;
let password = config.databases.connection.password;
let database2 = config.databases.connection.database;

module.exports = {

    getdatabase: function getdatabase() {

        if (config.databases.select == "mysql") {
            const database = new Keyv('mysql://${username}:${password}@${host}:${port}/${database2}');
            Keyv.on('error') (
                console.log(chalk.red("[PteroDash] An error has occured while trying to access database"))
            )
            return database;
        }
        if (config.databases.select == "redis") {
            const database = new Keyv('redis://${username}:${password}@${host}:${port}');
            Keyv.on('error') (
                console.log(chalk.red("[PteroDash] An error has occured while trying to access database"))
            )
            return database;
        }
        if (config.databases.select == "mongo") {
            const database = new Keyv('mongodb://${username}:${password}@${host}:${port}/${database2}');
            Keyv.on('error') (
                console.log(chalk.red("[PteroDash] An error has occured while trying to access database"))
            )
            return database;
        }
        if (config.databases.select == "postgres") {
            const database = new Keyv('postgresql://${username}:${password}@${host}:$port}/${database2}');
            Keyv.on('error') (
                console.log(chalk.red("[PteroDash] An error has occured while trying to access database"))
            )
            return database;
        }
        if (config.databases.select == "etcd") {
            const database = new Keyv('etcd://${host}:${port}');
            Keyv.on('error') (
                console.log(chalk.red("[PteroDash] An error has occured while trying to access database"))
            )
            return database;
        }
        if (config.databases.select == "sqlite") {
            let sqlite = '../database.sqlite';
            const database = new Keyv('sqlite://' + sqlite);
            Keyv.on('error') (
                console.log(chalk.red("[PteroDash] An error has occured while trying to access database"))
            )
            return database;
        }
    }
}