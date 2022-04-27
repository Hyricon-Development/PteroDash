const nodemailer = require("nodemailer");
const db = require('../handlers/database').getdatabase()
const config = require('../handlers/sync').syncconfig()
const routes = require('../handlers/sync').syncroutes()
const fetch = require('node-fetch');

module.exports.load = async function (app) {

  app.post("/oauth/email/login", async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    if (!email || !password) return res.redirect('/login')
    
    if (!(await db.get(`user-${email}`))) return res.send('<br> Account with this email does not exist </br>')

    const account = await db.get(`user-${email}`)

    if (email != account.email || password != account.password) return res.send('<br> Wrong email or password, try again. </br>')

    if (account.blacklist = true) return res.send(`<br> You have been blacklisted from ${config.name} </br>`)
    
    if (account.type == "discord") return res.send('<br> Looks like you signed up with discord, try using discord to login </br>')

    if (account.type == "google") return res.send('<br> Looks like you signed up with google, try using google to login </br>')

    const response = await fetch(`${config.pterodactyl.domain}/api/application/users/${email}?include=servers`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.pterodactyl.key}`,
        },
      }
    );

    if ((await response.statusText) == "Not Found") return res.send('<br> Could not get info, contact an administrator </br>')

    const panelinfo = (await response.json()).attributes;

    const package = await db.get(`package-${email}`)
    const coins = await db.get(`coins-${email}`)
    const resources = await db.get(`resources-${email}`)

    req.session.data = {
      userinfo: account,
      coins: coins,
      resources: resources,
      package: package,
      panelinfo: panelinfo,
    };

    return res.redirect(routes.redirects.callback)
  });

  app.post("/oauth/email/signup", async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    const password_confirm = req.body.password_confirm
    const username = req.body.username
    const first_name = req.body.username
    const last_name = req.body.username
    const referral = req.body.referral

    if (!email || !password || !password_confirm || !username || !first_name || !last_name) return res.redirect('/login')
    
    if (password !== password_confirm) return res.send('<br> Password is not the same as confirm password </br>')
    
    const account = await db.get(`user-${email}`)

    if (account) return res.send('Account with this email already exists')
    
    const panelinfo = await fetch(`${config.pterodactyl.domain}/api/application/users`, {
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
    
    if (config.referrals.enabled = true) {  
      let referrals = await db.get(`referrals-${referral}`)

      if (referrals) {     
          let newinvites = referrals.invites + 1;        
          referrals.invites = newinvites

          await db.set(`referrals-${referral}`, referrals);
        }
      }

    const userinfo = {
      email: email,
      password: password,
      username: username,
      first_name: first_name,
      last_name: last_name,
      type: "email",
      blacklist: false,
      resetid: null,
      code: makeid(6)
    }

    const referrals = {
      invites: null
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

    if (config.coins.enabled = true) await db.set(`coins-${email}`, 0)

    await db.set(`user-${email}`, userinfo);
    await db.set(`resources-${email}`, resources);
    await db.set(`package-${email}`, plan);
    await db.set(`referrals-${userinfo.code}`, referrals);

    req.session.data = {
      userinfo: userinfo,
      coins: 0,
      resources: resources,
      package: plan,
      panelinfo: panelinfo
    };

    const mailer = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: true,
      auth: {
        user: config.smtp.username,
        pass: config.smtp.password
      },
    });

    var content = `<br>Thanks for signing up to ${config.name}</br><br>Here are your details for Game Panel</br><li>Email: ${email}</li><li>Username: ${username}</li><li>Password: ${password}</li>`

    mailer.sendMail({
      from: config.smtp.mailfrom,
      to: email,
      subject: 'Thanks for signing up',
      html: content,
    });

    return res.redirect(routes.redirects.callback)
  });

  app.post("/accounts/password/reset", async (req, res) => {

    const email = req.body.email;

    let account = await db.get(`user-${email}`)

    if (!account) return res.send('Account with this email does not exist')

    if (account.blacklist = true) return res.send(`<br> You have been blacklisted from ${config.name} </br>`)
    
    if (account.type == "discord") return res.send('</br> Looks like you signed up with discord, try using discord to login </br>')

    if (account.type == "google") return res.send('<br> Looks like you signed up with google, try using google to login </br>')

    const mailer = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: true,
      auth: {
        user: config.smtp.username,
        pass: config.smtp.password
      },
    });

    const id = makeid(8);

    var content = `<h1>${config.name}</h1><br>We've received a request for resetting your account password</br>If this was you please click this <a href="${config.webserver.host}/reset/password?id=${id}">link</a><br>If this wasn't you, you can ignore this email</br>`;

    mailer.sendMail({
      from: config.smtp.mailfrom,
      to: email,
      subject: `Reset ${config.name} password`,
      html: content,
    });
    
    account.resetid = id

    await db.set(`user-${email}`, account)

    return res.redirect(routes.redirects.password_reset)
    })

    app.post("/accounts/password/reset/:id", async (req, res) => {

      const id = req.params.id
      const password = req.body.password
      const password_confirm = req.body.password_confirm

      if (!id) return res.redirect(`/login`)

      if (id !== account.id) return res.redirect('/login')

      if (!password || !password_confirm) return res.redirect(`/reset/password?id=${id}`)

      if (password !== password_confirm) return res.redirect(`/reset/password?id=${id}`)

      let account = await db.get(`user-${email}`)
    
      account.password = password
      account.resetid = null

      await db.set(`user-${email}`, account)

      return res.redirect(routes.redirects.password_reset)
    });
  }

  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
