const nodemailer = require("nodemailer");
const db = require('../handlers/databases').getdatabase()
const config = require('../handlers/sync').syncconfig()
const routes = require('../handlers/sync').syncroutes()

module.exports.load = async function (webserver) {

  webserver.post("/oauth2/email/login", async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    
    if (!(await db.get(`user-${email}`))) return res.send('Account with this email does not exist')

    const account = await db.get(`user-${email}`)

    if (email != account.email || password != account.password) return res.send('Wrong email or password, try again.')

    if (account.blacklist = true) return res.send(`You have been blacklisted from ${config.name}`)
    
    if (account.type == "discord") return res.send('Looks like you signed up with discord, try using discord to login')

    if (account.type == "google") return res.send('Looks like you signed up with google, try using google to login')

    const servers = await fetch(`${config.pterodactyl.domain}/api/application/users/${email}?include=servers`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.pterodactyl.key}`,
        },
      }
    );

    if ((await servers.statusText) === "Not Found") return res.send('Could not get info, contact an administrator')

    const panelinfo = (await servers.json()).attributes;

    const userinfo = {
      email: email,
      password: password
    }

    req.session.data = {
      userinfo: userinfo,
      panelinfo: panelinfo
    };

    return res.redirect(routes.redirects.callback)
  });
}