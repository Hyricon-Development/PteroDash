const routes = require('../handlers/sync').syncroutes();
const config = require('../handlers/sync').syncconfig();
const ejs = require("ejs");
const chalk = require('chalk')
const app = require('../handlers/app').app();

app.set('view engine', 'ejs');

app.all("*", async (req, res) => {

    var file

    if (req._parsedUrl.pathname === '/') {
        file = routes.index
    } else {
        let path = req._parsedUrl.pathname.slice(1)

        if (path.slice(-1) === '/') path = path.slice(0, -1)

        const verify = Object.entries(routes.pages).filter(p => p[0] === path)

        if (verify.length === 0) {
            file = routes.pages.notfound
        }

        if (verify.length === 1) {

            if (path === "/login") {
                file = routes.pages.login
            } else {
                if (!req.session) return res.redirect('/login')
                file = path
            }
        }
    }

    const package = db.get(`package-${req.session.userinfo.email}`)
    const coins = db.get(`coins-${req.session.userinfo.email}`)
    const resources = db.get(`resources-${req.session.userinfo.email}`)

    const values = {
        config: config,
        data: req.session,
        package: package,
        coins: coins,
        resources: resources
    }
    
    ejs.renderFile(`./pages/${file}`, values, null, async function (err) { 
        if (err) {
            console.log(chalk.red(`[PteroDash] An error has occured while rendering ${file}`))
            console.log(err)
        };
        res.send(`./pages/${file}`)
    })
});  