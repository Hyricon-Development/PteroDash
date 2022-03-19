const fetch = require("node-fetch");
const config = require('../handlers/sync').syncconfig().config;
const mysqldb = require('../handlers/mysql').getmysqldb()

module.exports.load = async function (app) {

  app.get("/oauth2/discord/login", async (req, res) => {

    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.discord.oauth2.id}&redirect_uri=${config.discord.oauth2.redirect}&response_type=code&scope=identify%20email${config.discord.bot.joinguild.enabled == true ? "%20guilds.join" : ""}${config.j4r.enabled == true ? "%20guilds&prompt=none" : (req.query.prompt ? (req.query.prompt == "none" ? "&prompt=none" : "") : "")}`
    );
  app.get("/oauth2/discord/callback"), async (req, res) => {

      if (!req.session.data) {

        return res.redirect("/oauth2/discord/login");
      }
      const redirects = config.discord.oauth2.redirect;

      if (!req.query.code) {

        req.redirect('/oauth2/discord/login')
      }
      const account = await process.db.fetchAccountByEmail(
        req.session.data.dbinfo.email
      );
      if (!account) {

        return res.redirect("/");
      }
      if (account.discord_id) {

        return res.redirect("/home");
      }

      const oauth2Token = await fetch("https://discord.com/api/oauth2/token", {

        method: "post",
        body: `client_id=${config.oauth2.discord.id}&client_secret=${
          config.oauth2.discord.secret
        }&grant_type=authorization_code&code=${encodeURIComponent(
          req.query.code
        )}&redirect_uri=${encodeURIComponent(
          /oauth2/discord/callback
        )}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (!oauth2Token.ok) 

        return functions.doRedirect(req, res, redirects.invalidcode);
        const tokenInfo = JSON.parse(await oauth2Token.text());
        const scopes = tokenInfo.scope;
      if (

        !scopes.includes("identify") ||
        !scopes.includes("guilds.join") ||
        !scopes.includes("email") ||
        !scopes.includes("guilds")
      )
        return functions.doRedirect(req, res, redirects.badscopes);
      const userinfo_raw = await fetch("https://discord.com/api/users/@me", {
        method: "get",
        headers: {
          Authorization: `Bearer ${client.discord.bot.token}`,
        }
      });

      const userinfo = JSON.parse(await userinfo_raw.text());

      if (!userinfo.verified) {

        return functions.doRedirect(req, res, redirects.unverified);
      }
      const guildinfo_raw = await fetch(
        "https://discord.com/api/users/@me/guilds",
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${client.discord.bot.token}`,
          },
        }
      );

      const guilds = await guildinfo_raw.json();
      if (!Array.isArray(guilds))
        return functions.doRedirect(req, res, redirects.cannotgetguilds); 

      userinfo.access_token = tokenInfo.access_token;
      userinfo.guilds = guilds;

      const account2 = await mysqldb.userinfo(
        email
        );

      req.session.data.dbinfo = account2;
      req.session.data.email = email;

      functions.doRedirect(req, res, redirects.linked);
    }
  });
}