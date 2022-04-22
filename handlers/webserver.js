const express = require("express");
const expressWs = require('express-ws')(webserver);
const ejs = require("ejs");
const session = require("express-session");
const config = require('../handlers/sync').syncconfig();
const chalk = require('chalk')

const webserver = express();
module.exports.webserver = webserver;

webserver.use(session({
    secret: config.webserver.secret
  }));

webserver.use(express.json({
    inflate: true,
    limit: '750kb',
    reviver: null,
    strict: true,
    type: 'application/json',
    verify: undefined
  }));

webserver.listen(config.webserver.port, err => {
  if (err) {
    console.log(chalk.red("[PteroDash] An error has occured while trying to load webserver"))
  } else {
    console.log(chalk.green("----------------------------------------------------"));
    console.log(chalk.green("PteroDash: v1"));
    console.log(chalk.green("Beta: v1.0.0"));
    console.log(chalk.green("----------------------------------------------------"));
    console.log(chalk.green(`PteroDash is up at ${config.webserver.host}:${config.webserver.port}`));
    console.log(chalk.green("----------------------------------------------------"));
  }
})
