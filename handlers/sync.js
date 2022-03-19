const fs = require("fs");

module.exports.renderdataeval = {

syncconfig: function syncconfig() {
    
   let config = JSON.parse(fs.readFileSync("../config.json"));
           
   return config;
   
  }
}