"use strict";

const chalk = require('chalk')
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const fetch = require("node-fetch")
const config = require('./handlers/sync').syncconfig();
const app = require('./handlers/app').app();

console.log(chalk.green("[PteroDash] Checking for updates..."))
fetch("https://raw.githubusercontent.com/Evolution-Development/PteroDash/main/scripts/assets/lv.json").then(res => Promise.resolve(res.json()).then(lv => {
  if (lv.version == "1.0.0") {
    console.log(chalk.green("[PteroDash] You're running the latest version of PteroDash"));
} else {
    console.log(chalk.red("[PteroDash] You're running an outdated version of PteroDash"));
}}));

console.log(chalk.green("[PteroDash] Checking blacklist status..."))
fetch("https://raw.githubusercontent.com/Evolution-Development/PteroDash/main/scripts/assets/blacklist.json").then(res => Promise.resolve(res.json()).then(blacklist => {
  for (var i = 0; i < blacklist.blacklist.length; i++) {
    if (blacklist.blacklist[i].domain == config.app.host) {
      console.log("[PteroDash] You are blacklisted from PteroDash")
      console.log(`Reason: ${blacklist.blacklist[i].reason}`)
      process.exit(1);
    }
  }}
))

app.use(session({
  secret: config.app.secret,
  resave: true,
  saveUninitialized: true
}));
    
app.use(express.json({
  inflate: true,
  limit: '750kb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
}));
    
app.listen(config.app.port, err => {
  if (err) {
    console.log(chalk.red("[PteroDash] An error has occured while trying to load webserver"));
    console.log(chalk.red(err));
  } else {
    console.log(chalk.green("----------------------------------------------------"));
    console.log(chalk.green("PteroDash: v1"));
    console.log(chalk.green("Beta: v1.0.0"));
    console.log(chalk.green("----------------------------------------------------"));
    console.log(chalk.green(`PteroDash is listening for connections on ${config.app.port}`));
    console.log(chalk.green("----------------------------------------------------"));
    }
 });

fs.readdirSync('./routes').filter(file => file.endsWith('.js'));

