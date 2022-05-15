"use strict";	

const config = require('../handlers/sync').syncconfig();
const routes = require('../handlers/sync').syncroutes();	
const db = require('../handlers/database').getdatabase();
const app = require('../handlers/app').app();

if (config.store.enabled == true) {
	app.get("/purchase/:type", async (res, req) => {

		const amount = req.body.amount;
        const useremail = req.session.userinfo.email
		const type = req.params.type

		if (!req.session) return res.redirect('/login')

		if (!amount || !type) return res.redirect('/store?error=MISSING_INFO')

		if (type !== "ram" && type !== "disk" && type !== "cpu" && type !== "servers" && type !== "databases" && type !== "allocations" && type !== "backups") return res.redirect('/store?error=INVALID_TYPE')

		if (amount < 1) return res.redirect(routes.redirects.invalid_amount)

		const coins = (await db.get(`coins-${useremail}`))
        
		const cost = (config.store[type].cost * amount)
		const per = (config.store[type].per * amount)
	
		if (coins < cost) return res.redirect(routes.redirects.cant_afford)

		const newcoins = (coins - cost)
		await db.set(`coins-${useremail}`, newcoins)

		let resources = await db.get(`resources-${useremail}`);
		resources[type] = resources[type] + parseInt(per);

		await db.set(`resources-${useremail}`, resources);

		return res.redirect("/store?sucess=true");
	});
}