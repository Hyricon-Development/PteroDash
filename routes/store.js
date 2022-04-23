"use strict";	

const config = require('../handlers/sync').syncconfig();
const routes = require('../handlers/sync').syncroutes();	
const db = require('../handlers/databases').getdatabase()

var useremail = req.session.data.email;

if(config.store.enabled == true) {
module.exports.load = async function(webserver) {

	webserver.get("/purchase/ram", async (res, req) => {

		let amount = req.query.amount;

		if (!amount) {
			res.redirect(routes.redirects.invalid_amount)
		}

		if (amount < 1 || amount > 10) {

			res.redirect(routes.redirects.invalid_amount)
		}

		if (!(await db.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		let coins = (await db.get(`coins-${useremail}`)) ? (await db.get(`coins-${useremail}`)) : 0;
		if (coins < parseInt(config.store.ram.cost)) {

			res.redirect(routes.redirects.cant_afford)
		}
		if (!(coins = coins - parseInt(config.store.ram.cost))) {

			await db.set(`coins-${useremail}`, coins)
			let resources = await db.get(`resources-${useremail}`);
			resources.ram = resources.ram + parseInt(config.store.ram.per);
			await db.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An_error_has_occured");
		}
		return res.redirect("/?purchased=Successfully purchased Disk");
	});

	webserver.get("/purchase/disk", async (res) => {

		let amount = req.query.amount;

		if (!amount) {
			res.redirect(routes.redirects.invalid_amount)
		}

		if (amount < 1 || amount > 10) {

			res.redirect(routes.redirects.invalid_amount)
		}

		if (!(await db.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		let coins = (await db.get(`coins-${useremail}`)) ? (await db.get(`coins-${useremail}`)) : 0;
		if (coins < parseInt(config.store.disk.cost)) {

			res.redirect(routes.redirects.cant_afford)
		}
		if (!(coins = coins - parseInt(config.store.disk.cost))) {

			await db.set(`coins-${useremail}`, coins)
			let resources = await db.get(`resources-${useremail}`);
			resources.disk = resources.disk + parseInt(config.store.disk.per);
			await db.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased RAM");
	});

	webserver.get("/purchase/cpu", async (res) => {

		let amount = req.query.amount;

		if (!amount) {
			res.redirect(routes.redirects.invalid_amount)
		}

		if (amount < 1 || amount > 10) {

			res.redirect(routes.redirects.invalid_amount)
		}

		if (!(await db.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		let coins = (await db.get(`coins-${useremail}`)) ? (await db.get(`coins-${useremail}`)) : 0;
		if (coins < parseInt(config.store.cpu.cost)) {

			res.redirect(routes.redirects.cant_afford)
		}
		if (!(coins = coins - parseInt(config.store.cpu.cost))) {

			await db.set(`coins-${useremail}`, coins)
			let resources = await db.get(`resources-${useremail}`);
			resources.cpu = resources.cpu + parseInt(config.store.cpu.per);
			await db.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased CPUs");
	});

	webserver.get("/purchase/servers", async (res) => {

		let amount = req.query.amount;

		if (!amount) {
			res.redirect(routes.redirects.invalid_amount)
		}

		if (amount < 1 || amount > 10) {

			res.redirect(routes.redirects.invalid_amount)
		}

		if (!(await db.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		let coins = (await db.get(`coins-${useremail}`)) ? (await db.get(`coins-${useremail}`)) : 0;
		if (coins < parseInt(config.store.servers.cost)) {

			res.redirect(routes.redirects.cant_afford)
		}
		if (!(coins = coins - parseInt(config.store.servers.cost))) {

			await db.set(`coins-${useremail}`, coins)
			let resources = await db.get(`resources-${useremail}`);
			resources.servers = resources.servers + parseInt(config.store.servers.per);
			await db.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased Servers");
	});

	webserver.get("/purchase/databases", async (res) => {

		let amount = req.query.amount;

		if (!amount) {
			res.redirect(routes.redirects.invalid_amount)
		}

		if (amount < 1 || amount > 10) {

			res.redirect(routes.redirects.invalid_amount)
		}

		if (!(await db.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		let coins = (await db.get(`coins-${useremail}`)) ? (await db.get(`coins-${useremail}`)) : 0;
		if (coins < parseInt(config.store.databases.cost)) {

			res.redirect(routes.redirects.cant_afford)
		}
		if (!(coins = coins - parseInt(config.store.databases.cost))) {

			await db.set(`coins-${useremail}`, coins)
			let resources = await db.get(`resources-${useremail}`);
			resources.databases = resources.databases + parseInt(config.store.databases.per);
			await db.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased Databases");
	});

	webserver.get("/purchase/allocations", async (res) => {

		let amount = req.query.amount;

		if (!amount) {
			res.redirect(routes.redirects.invalid_amount)
		}

		if (amount < 1 || amount > 10) {

			res.redirect(routes.redirects.invalid_amount)
		}

		if (!(await db.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		let coins = (await db.get(`coins-${useremail}`)) ? (await db.get(`coins-${useremail}`)) : 0;
		if (coins < parseInt(config.store.allocations.cost)) {

			res.redirect(routes.redirects.cant_afford)
		}
		if (!(coins = coins - parseInt(config.store.allocations.cost))) {

			await db.set(`coins-${useremail}`, coins)
			let resources = await db.get(`resources-${useremail}`);
			resources.allocations = resources.allocations + parseInt(config.store.allocations.per);
			await db.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased Allocations");
	});

	webserver.get("/purchase/backups", async (res) => {

		let amount = req.query.amount;

		if (!amount) {
			res.redirect(routes.redirects.invalid_amount)
		}

		if (amount < 1 || amount > 10) {

			res.redirect(routes.redirects.invalid_amount)
		}

		if (!(await db.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		let coins = (await db.get(`coins-${useremail}`)) ? (await db.get(`coins-${useremail}`)) : 0;
		if (coins < parseInt(config.store.backups.cost)) {

			res.redirect(routes.redirects.cant_afford)
		}
		if (!(coins = coins - parseInt(config.store.backups.cost))) {

			await db.set(`coins-${useremail}`, coins)
			let resources = await db.get(`resources-${useremail}`);
			resources.backups = resources.backups + parseInt(config.store.backups.per);
			await db.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased Backups");
	});
  }
}