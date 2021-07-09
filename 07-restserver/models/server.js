const express = require('express');
var cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Parseo y lectura de body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes(){
        //Se accede a usuarios(rutas y estas acceden al controlador)
        this.app.use(this.usersPath,require('../routes/users'))

    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Server running on port: ',this.port)
        })
    }

}

module.exports = Server;