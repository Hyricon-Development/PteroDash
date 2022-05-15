const config = require('../handlers/sync').syncconfig();
const db = require('../handlers/database').getdatabase()
const jwt = require('jsonwebtoken');
const app = require('../handlers/app').app();

if (config.api.enabled == "true") {

		app.get("/api/userinfo", async (res, req) => {

			const authHeader = req.headers['authorization'];
			const token = authHeader && authHeader.split(' ')[1];
			const email = req.body['email']

			if (email == null) return res.sendStatus(400);

			if (!(await db.get(`user-${email}`))) return res.sendStatus(400)

			if (token == null) return res.sendStatus(401);

			jwt.verify(token, config.api.token, err => {
				if (err) return res.sendStatus(403)
			})

			let package = await db.get(`package-${email}`) ? await db.get(`package-${email}`) : {
				package: null,
				ram: 0,
				disk: 0,
				cpu: 0,
				servers: 0,
				databases: 0,
				allocations: 0,
				backups: 0
			}
			let coins = await db.get(`coins-${email}`);
			let resources = await db.get(`resources-${email}`) ? await db.get(`resources-${email}`) : {
				ram: 0,
				disk: 0,
				cpu: 0,
				servers: 0,
				databases: 0,
				allocations: 0,
				backups: 0
			}

			res.send({
				package: package,
				resources: resources,
				coins: coins
			})
		})
	}
	app.post("/api/setcoins", async (res, req) => {

		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		const email = req.body['email']
		const coins = req.body['coins']

		if (email == null) return res.sendStatus(400);

		if (!(await db.get(`user-${email}`))) return res.sendStatus(400)

		if (coins == null) return res.sendStatus(400);

		if (token == null) return res.sendStatus(401);

		jwt.verify(token, config.api.token, err => {
			if (err) return res.sendStatus(403)
		})

		await db.set(`coins-${email}`, coins)

		return res.sendStatus(200)
	})
	app.post("/api/setpackage", async (res, req) => {

		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		const email = req.body['email']
		const package = req.body['package']

		if (email == null) return res.sendStatus(400);

		if (!(await db.get(`user-${email}`))) return res.sendStatus(400)

		if (package == null) return res.sendStatus(400);

		if (token == null) return res.sendStatus(401);

		jwt.verify(token, config.api.token, err => {
			if (err) return res.sendStatus(403)
		})

		await db.set(`package-${email}`, package)

		return res.sendStatus(200)
	})
	app.post("/api/setresources", async (res, req) => {

		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		const email = req.body['email']
		const ram = req.body['ram']
		const disk = req.body['disk']
		const cpu = req.body['cpu']
		const servers = req.body['servers']
		const databases = req.body['databases']
		const allocations = req.body['allocations']
		const backups = req.body['backups']

		if (email == null) return res.sendStatus(400);

		if (!(await db.get(`user-${email}`))) return res.sendStatus(400)

		if (ram == null) return res.sendStatus(400);
		if (disk == null) return res.sendStatus(400);
		if (cpu == null) return res.sendStatus(400);
		if (servers == null) return res.sendStatus(400);
		if (databases == null) return res.sendStatus(400);
		if (allocations == null) return res.sendStatus(400);
		if (backups == null) return res.sendStatus(400);

		if (token == null) return res.sendStatus(401);

		jwt.verify(token, config.api.token, err => {
			if (err) return res.sendStatus(403)
		})

		let resources = await db.get(`resources-${useremail}`);
		resources.ram = ram
		resources.disk = disk
		resources.cpu = cpu
		resources.servers = servers
		resources.databases = databases
		resources.allocations = allocations
		resources.backups = backups

		await db.set(`resources-${email}`, resources)

		return res.sendStatus(200)
	})
	app.post("/api/blacklist", async (res, req) => {

		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		const email = req.body['email']

		if (email == null) return res.sendStatus(400);

		if (!(await db.get(`user-${email}`))) return res.sendStatus(400)

		if (token == null) return res.sendStatus(401);

		jwt.verify(token, config.api.token, err => {
			if (err) return res.sendStatus(403)
		})

		let account = db.get(`user-${email}`)
		account.blacklist = true

		await db.set(`user-${email}`, account)

		return res.sendStatus(200)
	})
	app.post("/api/unblacklist", async (res, req) => {

		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		const email = req.body['email']

		if (email == null) return res.sendStatus(400);

		if (!(await db.get(`user-${email}`))) return res.sendStatus(400)

		if (token == null) return res.sendStatus(401);

		jwt.verify(token, config.api.token, err => {
			if (err) return res.sendStatus(403)
		})

		let account = db.get(`user-${email}`)
		account.blacklist = false

		await db.set(`user-${email}`, account)

		return res.sendStatus(200)
	})
	app.post("/api/createcoupon", async (res, req) => {

		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		const code = req.body['code']
		const coins = req.body['coins']
		const ram = req.body['ram']
		const disk = req.body['disk']
		const cpu = req.body['cpu']
		const servers = req.body['servers']
		const databases = req.body['databases']
		const allocations = req.body['allocations']
		const backups = req.body['backups']

		if (code == null) return res.sendStatus(400);
		if (coins == null) return res.sendStatus(400);
		if (ram == null) return res.sendStatus(400);
		if (disk == null) return res.sendStatus(400);
		if (cpu == null) return res.sendStatus(400);
		if (servers == null) return res.sendStatus(400);
		if (databases == null) return res.sendStatus(400);
		if (allocations == null) return res.sendStatus(400);
		if (backups == null) return res.sendStatus(400);
		if (token == null) return res.sendStatus(401);

		jwt.verify(token, config.api.token, err => {
			if (err) return res.sendStatus(403)
		})

		await db.set(`coupon-${code}`, {
			coins: coins,
			ram: ram,
			disk: disk,
			cpu: cpu,
			servers: servers,
			databases: databases,
			allocations: allocations,
			backups: backups
		});

		return res.sendStatus(200)
	})
	app.post("/api/revokecoupon", async (res, req) => {

		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		const code = req.body['code']

		if (code == null) return res.sendStatus(400);

		if (!(await db.get(`coupon-${code}`))) return res.sendStatus(400)

		if (token == null) return res.sendStatus(401);

		jwt.verify(token, config.api.token, err => {
			if (err) return res.sendStatus(403)
		})

		await db.delete(`coupon-${code}`);

		return res.sendStatus(200)
	})