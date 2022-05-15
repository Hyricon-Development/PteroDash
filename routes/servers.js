"use strict";	

const db = require('../handlers/database').getdatabase()
const config = require('../handlers/sync').syncconfig()
const routes = require('../handlers/sync').syncroutes()
const fetch = require('node-fetch');
const app = require('../handlers/app').app();

    app.get("/create", async (res, req) => {

        const name = req.body.name
        const ram = req.body.ram    
        const disk = req.body.disk
        const cpu = req.body.cpu
        const databases = req.body.databases
        const allocations = req.body.allocations
        const backups = req.body.backups
        const email = req.session.userinfo.email

        if (!name || !ram || !disk || !cpu || !databases || !allocations || !backups) return res.redirect(routes.redirects.missing_info)

        if (!req.session) return res.redirect('/login')

        
    });

    app.get("/delete", async (res, req) => {

        const id = req.body.id
        const email = req.session.userinfo.email

        if (!id) return res.redirect(routes.redirects.missingid)

        if (!req.session) return res.redirect('/login')
    });