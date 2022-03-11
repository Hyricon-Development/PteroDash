const Keyv = require('keyv');
const config = require('../config.json')
const mysql = new Keyv('mysql://config.database.mysql.username:config.database.mysql.password@config.database.mysql.host/config.database.mysql.database');
mysql.on('error', handleConnectionError);