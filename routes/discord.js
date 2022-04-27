const fetch = require('node-fetch');
const config = require('../handlers/sync').syncconfig();
const routes = require('../handlers/sync').syncroutes();
const db = require('../handlers/database').getdatabase()

module.exports.load = async function (webserver) {
    
    webserver.get('/oauth2/discord/signup', async (res) => {
        res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.discord.id}&redirect_uri=${config.discord.redirects.signup}&response_type=code&scope=identify%20email%20guilds.join%20guilds`);
    });

    webserver.get('/oauth2/discord/login', async (res) => {
        res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.discord.id}&redirect_uri=${config.discord.redirects.login}&response_type=code&scope=identify%20email%20guilds.join%20guilds`);
    });

    webserver.get('/accounts/discord/link', async (res) => {
        res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.discord.id}&redirect_uri=${config.discord.redirects.link}&response_type=code&scope=identify%20email%20guilds.join%20guilds`);
    });
  }
  