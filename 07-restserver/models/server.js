const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            users:      '/api/users',
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            uploads:    '/api/uploads'
        }


        //Conexion a db (mongo)
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Parseo y lectura de body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        //Manejar el fcoile upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes(){
        //Se accede a usuarios(rutas y estas acceden al controlador)
        this.app.use(this.paths.auth,require('../routes/auth'));

        this.app.use(this.paths.users,require('../routes/users'));

        this.app.use(this.paths.categories,require('../routes/categories'));

        this.app.use(this.paths.products,require('../routes/products'));

        this.app.use(this.paths.search,require('../routes/search'));

        this.app.use(this.paths.uploads,require('../routes/uploads'));

    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Server running on port: ',this.port)
        })
    }

}

module.exports = Server;