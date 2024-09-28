const express = require('express');
const router = require('./router')

function createServer() {
    const app = express();
    app.use(express.json());
    app.use('/', router);
    return app;
}

module.exports = createServer;