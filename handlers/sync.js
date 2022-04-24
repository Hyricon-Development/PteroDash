const fs = require("fs");
const chalk = require('chalk')

module.exports = {

syncconfig: () => {

  let config = YAML.parse(fs.readFileSync(syncpath().config));
  config.on('error', () => {
    console.log(chalk.red("[PteroDash] An error has occured while trying to read config.yml"));
  });
  return config;

},
syncroutes: () => {

  let routes = YAML.parse(fs.readFileSync(syncpath().routes));
  routes.on('error', () => {
    console.log(chalk.red("[PteroDash] An error has occured while trying to read routes.yml"));
  });
  return routes;
},
syncpath: () => {

  let path = YAML.parse(fs.readFileSync("./path.yml"));
  path.on('error', () => {
    console.log(chalk.red("[PteroDash] An error has occured while trying to read path.yml"));
  });
  return path;

}};