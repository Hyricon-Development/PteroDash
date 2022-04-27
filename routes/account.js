const db = require('../handlers/database').getdatabase()

module.exports.load = async function (app) {

  app.post("/accounts/details/reset", async (req, res) => {
        
        const email = req.session.data.userinfo.email
        const newemail = req.body.email
        const username = req.body.username
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const password = req.body.password

        if (!email) return res.redirect('/login')

        if (!newemail || !username || !first_name || !last_name || !password) return res.redirect('/profile/settings')

        let account = await db.get(`user-${email}`)
        account.email = newemail
        account.username = username
        account.first_name = first_name
        account.last_name = last_name
        account.password = password

        await db.delete(`user-${email}`)
        await db.set(`user-${newemail}`, account);

        let resources = await db.get(`resources-${email}`)

        await db.delete(`resources-${email}`)
        await db.set(`resources-${newemail}`, resources);

        let coins = await db.get(`coins-${email}`)

        await db.delete(`coins-${email}`)
        await db.set(`coins-${newemail}`, coins);

        let package = await db.get(`package-${email}`)

        await db.delete(`package-${email}`)
        await db.set(`package-${newemail}`, package);

        await fetch(`${config.pterodactyl.domain}/api/application/users/${req.session.pterodactyl.id}`, {
              method: "patch",
              headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${config.pterodactyl.key}`
              },
              body: JSON.stringify({
                username: username,
                email: newemail,
                first_name: first_name,
                last_name: last_name,
                password: password
              })
            });

        const response = await fetch(`${config.pterodactyl.domain}/api/application/users/${email}?include=servers`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                 Authorization: `Bearer ${config.pterodactyl.key}`,
            },
        });

        if ((await response.statusText) == "Not Found") return res.send('<br> Could not get info, contact an administrator </br>')

        const panelinfo = (await response.json()).attributes;

        req.session.data = {
            userinfo: account,
            coins: coins,
            resources: resources,
            package: package,
            panelinfo: panelinfo
          };

        return res.redirect('/profile/settings')
    });
}