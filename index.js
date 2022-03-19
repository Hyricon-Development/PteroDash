const chalk = require('chalk')
const config = require('../handlers/sync').syncconfig().config;
console.log(chalk.green("[Faliactyl] Files loaded"));

let routes = fs.readdirSync('./routes').filter(file => file.endsWith('.js'));
routes.forEach(file => {

let routes = require(`./routes/${file}`);
routes.load(app, db);
console.log(chalk.green("[Faliactyl] Routes loaded"));
});

let handlers = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));
handlers.forEach(file => {

let handlers = require(`./handlers/${file}`);
handlers.load(app, db);
console.log(chalk.green("[Faliactyl] Handlers loaded"));
});

console.log(chalk.green("----------------------------------------------------"));
console.log(chalk.green("PterodactylDash"));
console.log(chalk.green("Release: Beta v1.0.0"));
console.log(chalk.green("----------------------------------------------------"));
console.log(chalk.green("PterodactylDash is running on port " + config.port));
console.log(chalk.green("----------------------------------------------------"))
