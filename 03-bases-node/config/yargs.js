const argv = require('yargs')
    .options({
        'b':{
            alias: 'base',
            type: 'number',
            demandOption: true,
            describe: 'Es la base de la tabla a multiplicar'
        },
        'l':{
            alias: 'listar',
            type: "boolean",
            default : false,
            describe:  'Mostrar tabla en terminal'
        },
        'h':{
            alias: 'hasta',
            type: 'number',
            describe: 'Hasta que numero se llegara',
            default: 10
        }
    })
    .check((argv,options)=>{
        if(isNaN(argv.b)){
            throw 'La base tiene que ser un numero'
        }
        return true;
    })
    .argv;

module.exports = argv;