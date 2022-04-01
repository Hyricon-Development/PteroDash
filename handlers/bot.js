"use strict";

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const config = require('../handlers/sync').syncconfig().config;
const database = require('../handlers/databases').getdatabase().database

if (config.booster.enabled == true) {
bot.on('guildMemberUpdate', async (oldMember, newMember) => {
    const role = oldMember.roles.find(role => role.id === config.booster.roleid);
    const role2 = newMember.roles.find(role => role.id === config.booster.roleid);
  
    if (!role && role2) {
    let useremail = req.session.data.email;
   	let coins = (await database.get(`${useremail}/coins`)) ? (await database.get(`${useremail}/coins`)) : 0;
    let coins2 = coins + parseInt(config.booster.coins)
    await database.set(`${useremail}/coins`, coins2)
  }

client.login(config.discord.bot.token);
 });
}
