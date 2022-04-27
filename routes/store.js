"use strict";	

const config = require('../handlers/sync').syncconfig();
const routes = require('../handlers/sync').syncroutes();	
const db = require('../handlers/database').getdatabase()

if(config.store.enabled == true) {
module.exports.load = async function(app) {

	app.get("/purchase/:type", async (res, req) => {

		let amount = req.body.amount;
        let useremail = req.session.data.userinfo.email
		let type = req.params.type

		if (!useremail) return res.redirect('/login')
		if (!(await db.get(`user-${useremail}`))) return res.redirect('/login')

		if (!amount || !type) return res.redirect('/store')

		if (type !== "ram" || type !== "disk" || type !== "cpu" || type !== "servers" || type !== "databases" || type !== "allocations" || type !== "backups") return res.redirect('/store?error=INVALID_TYPE')

		if (amount < 1) return res.redirect(routes.redirects.invalid_amount)

		let coins = (await db.get(`coins-${useremail}`)) ? (await db.get(`coins-${useremail}`)) : 0;
        
		const cost = (config.store[type].cost * amount)
		const per = (config.store[type].per * amount)
	
		if (coins < cost) return res.redirect(routes.redirects.cant_afford)

		if (coins >= cost) {

			const newcoins = coins - cost
			await db.set(`coins-${useremail}`, newcoins)

			let resources = await db.get(`resources-${useremail}`);
			resources[type] = resources[type] + parseInt(per);

			await db.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/store?sucess=false");
		}
		return res.redirect("/store?sucess=true");
	});
}}