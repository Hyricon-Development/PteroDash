const nodemailer = require("nodemailer");
const db = require('../handlers/databases').getdatabase()
const config = require('../handlers/sync').syncconfig()
const routes = require('../handlers/sync').syncroutes()
const fetch = require('node-fetch');

module.exports.load = async function (webserver) {

  webserver.post("/oauth/email/login", async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    if (!email || !password) return res.redirect('/login')
    
    if (!(await db.get(`user-${email}`))) return res.send('Account with this email does not exist')

    const account = await db.get(`user-${email}`)

    if (email != account.email || password != account.password) return res.send('Wrong email or password, try again.')

    if (account.blacklist = true) return res.send(`You have been blacklisted from ${config.name}`)
    
    if (account.type == "discord") return res.send('Looks like you signed up with discord, try using discord to login')

    if (account.type == "google") return res.send('Looks like you signed up with google, try using google to login')

    const response = await fetch(`${config.pterodactyl.domain}/api/application/users/${email}?include=servers`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.pterodactyl.key}`,
        },
      }
    );

    if ((await response.statusText) == "Not Found") return res.send('Could not get info, contact an administrator')

    const panelinfo = (await response.json()).attributes;

    const package = await db.get(`package-${email}`)
    const coins = await db.get(`coins-${email}`)
    const resources = await db.get(`resources-${email}`)

    req.session.data = {
      userinfo: account,
      coins: coins,
      resources: resources,
      package: package,
      panelinfo: panelinfo
    };

    return res.redirect(routes.redirects.callback)
  });

  webserver.post("/oauth/email/signup", async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    const password_confirm = req.body.password_confirm
    const username = req.body.username
    const first_name = req.body.username
    const last_name = req.body.username

    if (!email || !password || !password_confirm || !username || !first_name || !last_name) return res.redirect('/login')
    
    if (password !== password_confirm) return res.send('Password is not the same as confirm password')
    
    const account = await db.get(`user-${email}`)

    if (account) return res.send('Account with this email already exists')
    
    const panelinfo = await fetch(config.pterodactyl.domain + "/api/application/users", {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${config.pterodactyl.key}`
        },
        body: JSON.stringify({
          username: username,
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: password
        })
      }
    );

    const userinfo = {
      email: email,
      password: password,
      username: username,
      first_name: first_name,
      last_name: last_name,
      type: "email",
      blacklist: false
    }

    const resources = {
      ram: null,
      disk: null,
      cpu: null,
      servers: null,
      databases: null,
      allocations: null,
      backups: null
    }

    const plan = {
      package: config.packages.default,
      ram: config.packages.list[plan.package].ram,
      disk: config.packages.list[plan.package].disk,
      cpu: config.packages.list[plan.package].cpu,
      servers: config.packages.list[plan.package].servers,
      databases: config.packages.list[plan.package].databases,
      allocations: config.packages.list[plan.package].allocations,
      backups: config.packages.list[plan.package].backups
    }

    await db.set(`user-${email}`, userinfo);
    await db.set(`coins-${email}`, 0)
    await db.set(`resources-${email}`, resources);
    await db.set(`package-${email}`, plan);

    req.session.data = {
      userinfo: userinfo,
      coins: 0,
      resources: resources,
      package: plan,
      panelinfo: panelinfo
    };
    
    return res.redirect(routes.redirects.callback)
  });
}