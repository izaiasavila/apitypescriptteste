"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var api_1 = require("./api/api");
var models = require('./models');
var server = http.createServer(api_1.default);
models.sequelize.sync({ force: false }).then(function () {
    //server.listen(config.serverPort);
    server.listen(process.env.PORT);
    server.on('listening', function () { return console.log("Servidor est\u00E1 rodando na porta " + process.env.PORT); });
    server.on('error', function (error) { return console.log("Ocorreu um erro: " + error); });
}, function (err) {
    console.log(err);
});
