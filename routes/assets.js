const express = require("express");
const app = require('../handlers/app').app();
    
app.use('/assets', express.static('./pages/assets'));