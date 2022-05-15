const routes = require('../handlers/sync').syncroutes()
const app = require('../handlers/app').app();

    app.get("/logout", async (req, res) => {

        if (!req.session)
            return res.send('<br> You are not signed in </br>');

        req.session.destroy();

        return res.redirect(routes.redirects.logout);
    });