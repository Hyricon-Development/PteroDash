const routes = require('../handlers/sync').syncroutes();
const ejs = require("ejs");
const chalk = require('chalk')

module.exports.load = async function (app) {

    app.set("view engine", ejs);

    app.all("*", async (req, res) => {

        if (routes.mustbeloggedin.includes(req._parsedUrl.pathname) && !req.session.data) return res.redirect('/login')    
         
        if (routes.mustbeadmin.includes(req._parsedUrl.pathname) && (req.session.data.userinfo.admin = false)) return res.redirect('/login?error=NOT_ADMIN')
    });

    app.get("/", async (res) => {
        res.render(`../pages/${routes.index}`, err => {
            if (err) {
                console.log(chalk.red(`An error has occured while trying to render ${routes.index}`));
                console.log(chalk.red(err));
            }
        })
    })
}
  