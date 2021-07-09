require('dotenv').config();
const Server = require('./models/server');

//Se crea la instancia server y se ejecutan todos los metodos del constructor
const server = new Server();

//Se levanta el server en algun puerto
server.listen();