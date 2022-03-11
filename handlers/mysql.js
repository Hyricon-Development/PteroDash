const fs = require("fs");
const Keyv = require('keyv');
const config = require('../config.json')
module.exports.renderdataeval =
  `(async () => {
   let config = JSON.parse(require("fs").readFileSync("../config.json"));
})();`;
const database = new Keyv('mysql://config.database.mysql.username:config.database.mysql.password@config.database.mysql.host/config.database.mysql.database');

module.exports = {
    getmysqldb: function getmysqldb() {
        return database;
    }
}