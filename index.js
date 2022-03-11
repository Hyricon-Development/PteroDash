"use strict";

console.log(chalk.green("[Faliactyl] Loading Files..."));
const config = require("./config.json");
console.log(chalk.green("[Faliactyl] Files loaded"));

    console.log(chalk.green("----------------------------------------------------"));
    console.log(chalk.green("PterodactylDash"));
    console.log(chalk.green("Release: Beta v1.0.0"));
    console.log(chalk.green("----------------------------------------------------"));
    console.log(chalk.green("PterodactylDash is running on port " + config.port));
    console.log(chalk.green("----------------------------------------------------"));
