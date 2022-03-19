const fetch = require("node-fetch");
const config = require('../handlers/sync').syncconfig().config;
const functions = require("../../functions.js");
const suspendCheck = require("../servers/suspension_system.js");
const express = require("express");
module.exports.load = async function (app) {
  app.get("/oauth2/discord", async (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.discord.oauth2.id}&redirect_uri=${config.discord.oauth2.redirect}&response_type=code&scope=identify%20email${config.discord.bot.joinguild.enabled == true ? "%20guilds.join" : ""}${config.j4r.enabled == true ? "%20guilds&prompt=none" : (req.query.prompt ? (req.query.prompt == "none" ? "&prompt=none" : "") : "")}`
    );
  });
}