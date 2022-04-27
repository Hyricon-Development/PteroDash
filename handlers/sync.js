const fs = require("fs");
const yaml = require('js-yaml')

module.exports = {

syncconfig: () => {

  let config = yaml.load(fs.readFileSync("./config.yml"));
  return config;

},
syncroutes: () => {

  let routes = yaml.load(fs.readFileSync("./pages/routes.yml"));
  return routes;
  
}}