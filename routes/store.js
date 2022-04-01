if(config.store.enabled == true) {

"use strict";	

const config = require('../handlers/sync').syncconfig().config;
const mysqldb = require('../handlers/databases').getdatabase().database

let useremail = req.session.data.email;

module.exports.load = async function() {

	app.get("/purchase/ram", async (res) => {

		if (!(await mysqldb.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		if (amount < 1 || amount > 10) {

			return res.send("Amount must be in numbers");
		}
		let coins = (await mysqldb.get(`${useremail}/coins`)) ? (await mysqldb.get(`${useremail}/coins`)) : 0;
		if (coins < parseInt(config.store.ram.cost)) {

			return res.send("You cannot afford this!");
		}
		if (!(coins = coins - parseInt(config.store.ram.cost))) {

			await mysqldb.set(`${useremail}/coins`, coins)
			let resources = await mysqldb.get(`resources-${useremail}`);
			resources.ram = resources.ram + parseInt(config.store.ram.per);
			await mysqldb.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased Disk");
	});

	app.get("/purchase/disk", async (res) => {

		if (!(await mysqldb.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		if (amount < 1 || amount > 10) {

			return res.send("Amount must be in numbers");
		}
		let coins = (await mysqldb.get(`${useremail}/coins`)) ? (await mysqldb.get(`${useremail}/coins`)) : 0;
		if (coins < parseInt(config.store.disk.cost)) {

			return res.send("You cannot afford this!");
		}
		if (!(coins = coins - parseInt(config.store.disk.cost))) {

			await mysqldb.set(`${useremail}/coins`, coins)
			let resources = await mysqldb.get(`resources-${useremail}`);
			resources.disk = resources.disk + parseInt(config.store.disk.per);
			await mysqldb.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased RAM");
	});

	app.get("/purchase/cpu", async (req, res) => {

		if (!(await mysqldb.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		if (amount < 1 || amount > 10) {

			return res.send("Amount must be in numbers");
		}
		let coins = (await mysqldb.get(`${useremail}/coins`)) ? (await mysqldb.get(`${useremail}/coins`)) : 0;
		if (coins < parseInt(config.store.cpu.cost)) {

			return res.send("You cannot afford this!");
		}
		if (!(coins = coins - parseInt(config.store.cpu.cost))) {

			await mysqldb.set(`${useremail}/coins`, coins)
			let resources = await mysqldb.get(`resources-${useremail}`);
			resources.cpu = resources.cpu + parseInt(config.store.cpu.per);
			await mysqldb.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased CPUs");
	});

	app.get("/purchase/servers", async (req, res) => {

		if (!(await mysqldb.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		if (amount < 1 || amount > 10) {

			return res.send("Amount must be in numbers");
		}
		let coins = (await mysqldb.get(`${useremail}/coins`)) ? (await mysqldb.get(`${useremail}/coins`)) : 0;
		if (coins < parseInt(config.store.servers.cost)) {

			return res.send("You cannot afford this!");
		}
		if (!(coins = coins - parseInt(config.store.servers.cost))) {

			await mysqldb.set(`${useremail}/coins`, coins)
			let resources = await mysqldb.get(`resources-${useremail}`);
			resources.servers = resources.servers + parseInt(config.store.servers.per);
			await mysqldb.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased Servers");
	});

	app.get("/purchase/databases", async (req, res) => {

		if (!(await mysqldb.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		if (amount < 1 || amount > 10) {

			return res.send("Amount must be in numbers");
		}
		let coins = (await mysqldb.get(`${useremail}/coins`)) ? (await mysqldb.get(`${useremail}/coins`)) : 0;
		if (coins < parseInt(config.store.databases.cost)) {

			return res.send("You cannot afford this!");
		}
		if (!(coins = coins - parseInt(config.store.databases.cost))) {

			await mysqldb.set(`${useremail}/coins`, coins)
			let resources = await mysqldb.get(`resources-${useremail}`);
			resources.databases = resources.databases + parseInt(config.store.databases.per);
			await mysqldb.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased Databases");
	});

	app.get("/purchase/allocations", async (req, res) => {

		if (!(await mysqldb.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		if (amount < 1 || amount > 10) {

			return res.send("Amount must be in numbers");
		}
		let coins = (await mysqldb.get(`${useremail}/coins`)) ? (await mysqldb.get(`${useremail}/coins`)) : 0;
		if (coins < parseInt(config.store.allocations.cost)) {

			return res.send("You cannot afford this!");
		}
		if (!(coins = coins - parseInt(config.store.allocations.cost))) {

			await mysqldb.set(`${useremail}/coins`, coins)
			let resources = await mysqldb.get(`resources-${useremail}`);
			resources.allocations = resources.allocations + parseInt(config.store.allocations.per);
			await mysqldb.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased Allocations");
	});

	app.get("/purchase/backups", async (req, res) => {

		if (!(await mysqldb.get(`user-${useremail}`))) {

			res.redirect("/login")
		}
		if (amount < 1 || amount > 10) {

			return res.send("Amount must be in numbers");
		}
		let coins = (await mysqldb.get(`${useremail}/coins`)) ? (await mysqldb.get(`${useremail}/coins`)) : 0;
		if (coins < parseInt(config.store.backups.cost)) {

			return res.send("You cannot afford this!");
		}
		if (!(coins = coins - parseInt(config.store.backups.cost))) {

			await mysqldb.set(`${useremail}/coins`, coins)
			let resources = await mysqldb.get(`resources-${useremail}`);
			resources.backups = resources.backups + parseInt(config.store.backups.per);
			await mysqldb.set(`resources-${useremail}`, resources);
		} else {

			return res.redirect("/?error=An error has occured");
		}
		return res.redirect("/?purchased=Successfully purchased Backups");
	});
  }
}