"use strict";

const chalk = require('chalk')
const fs = require("fs");
const config = require('../handlers/sync').syncconfig().config;

let routes = fs.readdirSync('./routes').filter(file => file.endsWith('.js'));
routes.forEach(file => {

let routes = require(`./routes/${file}`);
routes.load(app, db);
});

let oauth2 = fs.readdirSync('./routes/oauth2').filter(file => file.endsWith('.js'));
oauth2.forEach(file => {

let oauth2 = require(`./routes/oauth2${file}`);
oauth2.load(app, db);
});

let link = fs.readdirSync('./routes/link').filter(file => file.endsWith('.js'));
link.forEach(file => {

let link = require(`./routes/link${file}`);
link.load(app, db);
});

if (config.pterodactyl.url = "https://panel.hyricon.com") {
  console.log(chalk.red("[PteroDash] Invalid Pterodactyl URL"));
};

if (config.webserver.host = "https://dash.hyricon.com") {
  console.log(chalk.red("[PteroDash] Invalid Webserver Host"));
};

if (config.webserver.port > 65535) {
    console.log(chalk.red("[PteroDash] Webserver port must be less than 65535"));
};

if (config.webserver.port < 1025) {
    console.log(chalk.red("[PteroDash] Webserver port must be greater than 1025"));
};

if (config.webserver.port > 1025 && config.webserver.port < 65535 && config.webserver.host != "https://dash.hyricon.com" && config.pterodactyl.url != "panel.hyricon.com") {
    
const listener = app.listen(config.webserver.port, function() {

console.log(chalk.green("----------------------------------------------------"));
console.log(chalk.green("PteroDash"));
console.log(chalk.green("Release: Beta v1.0.0"));
console.log(chalk.green("----------------------------------------------------"));
console.log(chalk.green("PteroDash is running on port " + listener.address().port));
console.log(chalk.green("----------------------------------------------------"))
});
}else {
  console.log(chalk.green("[PteroDash] Error while trying to load webserver"));
}
