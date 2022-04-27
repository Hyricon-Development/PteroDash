const routes = require('../handlers/sync').syncroutes()

module.exports.load = async (app) => {

    app.get("/logout", async (req, res) => {

        if (!req.session.data)
            return res.send('You are not signed in');

        delete req.session.data;

        return res.redirect(routes.redirects.logout);
    });

    app.get("/rickroll", async (res) => res.send('hi'))
}