const fs = require("fs");
var jsonsync = require('json');

module.exports.renderdataeval = {

syncconfig: function syncconfig() {
    
   let config = JSON.parse(require("fs").readFileSync("../config.json"));
   let json = jsonsync.toJson(data)
   return JSON.jsonsync(json);
}
}