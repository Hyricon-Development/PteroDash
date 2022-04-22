"use strict";

const chalk = require('chalk')
const fs = require("fs");
const { webserver } = require('../handlers/webserver')
const fetch = require("node-fetch");
const prompt = require('prompt-sync')();
const exec = require("child_process").exec

const config = require('../handlers/sync').syncconfig();
module.exports.config = config;

const userinfo  = require('../handlers/userinfo').UserInfo()
module.exports.userinfo = userinfo;

const db = require('../handlers/database').getdatabase()
module.exports.db = db;

let routes = fs.readdirSync('./routes').filter(file => file.endsWith('.js'));
routes.forEach(file => {
  let routes = require(`./routes/${file}`);
  routes.load(webserver, db);
  routes.on('error', () => {
    console.log(chalk.red("[PteroDash] An error has occured while trying to sync routes"))
  });
});

console.log(chalk.green("[PteroDash] Checking for updates...")), () => {
  const response = await fetch('https://raw.githubusercontent.com/Evolution-Development/PterodactylDash/main/scripts/assets/lv.json');
  const lv = await response.json();
  if (lv.version == "1.0.0") {
    console.log(chalk.green("[PteroDash] You're running the latest version of PteroDash"));
  } else {
    console.log(chalk.red("[PteroDash] You're running an outdated version of PteroDash"));
    let update = prompt('[PteroDash] Would you like to update to the latest version? [Y/N]');
    if (update == "y") {
      console.log(chalk.green("[PteroDash] Running update script..."));
      exec("bash <(curl -s https://raw.githubusercontent.com/Evolution-Development/PterodactylDash/main/scripts/update.sh)");
    }
  }
};

console.log(chalk.green("[PteroDash] Checking blacklist status...")), () => {
  const response = await fetch('https://raw.githubusercontent.com/Evolution-Development/PterodactylDash/main/scripts/assets/blacklist.json');
  const blacklist = await response.json().blacklist;
  for (var i = 0; i < blacklist.length; i++) {
    if (blacklist[i].domain == config.webserver.host) {
      console.log(chalk.red("[PteroDash] You are blacklisted from PteroDash"));
      console.log(chalk.red(`[PteroDash] Reason: ${blacklist[i].reason}`));
    } else {
      webserver();
    }
  }
}