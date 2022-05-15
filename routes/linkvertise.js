"use strict";	

const config = require('../handlers/sync').syncconfig();
const db = require('../handlers/database').getdatabase();
const linkvertise = require('../handlers/linkvertise').linkvertise();
const makeid = require('../handlers/makeid').makeid();
const app = require('../handlers/app').app();

if (config.linkvertise.enabled == true) {
    
    app.get(`/lv/gen`, async (req, res) => {

        if (!req.session) return res.redirect('/login')

        const referer = req.headers.referer

        if (!referer) return res.redirect('/lv')

        const code = makeid(6)
        const link = linkvertise(config.linkvertise.userid, `${referer}/lv/redeem?code=${code}`)

        req.session.code = code

        return res.redirect(link) 
    });

    app.get('/lv/redeem', async (req, res) => {

        if (!req.session) return res.redirect('/login')

        const code = req.query.code
        const email = req.session.userinfo.email

        if (!code) return res.send('<br> You do not have access to this API point </br>')

        if (req.session.code !== code) return res.redirect('/lv')

        if (!req.session) return res.redirect('/login')

        if (!req.headers.referer) return res.send('<br> You do not have access to this API point </br>')

        if (!req.headers.referer.includes('linkvertise.com')) return res.send('<br> Our systems have detected that you are using a Linkvertise bypasser </br>')

        const coins = await db.get(`coins-${email}`);
        const newcoins = coins + config.linkvertise.coins;

        await db.set(`coins-${email}`, newcoins);

        req.session.code = null

        return res.redirect('/lv?sucess=true')
    });
}
