const express = require("express");

module.exports.load = async function (app) {
    
    app.use('/assets', express.static('../pages/assets'));
}