const config = require('../handlers/sync').syncconfig();
const db = require('../handlers/databases').getdatabase()
const jwt = require('jsonwebtoken');

if (config.api.enabled == "true") {

    module.exports.load = async (webserver) => {

        webserver.get("/api/userinfo", async (res, req) => {

            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            const email = req.body['email']
            
            if (!(await db.get(`user-${email}`))) return res.sendStatus(400)

            if (token == null) return res.sendStatus(401);

            jwt.verify(token, config.api.token, err => {
                if (err) return res.sendStatus(403)                                    
            })

            let package = await db.get(`package-${email}`);
            let coins = await db.get(`coins-${email}`);
            let resources = await db.get(`resources-${email}`) ? await db.get(`resources-${email}`): {
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
        });
    }
}