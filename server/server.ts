import * as http from 'http';
import Api from './api/api';

const models = require('./models');

const server = http.createServer(Api);

models.sequelize.sync({ force: false }).then(() => {
  //server.listen(config.serverPort);
  server.listen(process.env.PORT);
  server.on('listening', () => console.log(`Servidor está rodando na porta ${process.env.PORT}`));
  server.on('error', (error: NodeJS.ErrnoException) => console.log(`Ocorreu um erro: ${error}`));
}, (err) => {
  console.log(err);
});
