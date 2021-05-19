const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');
const colors = require('colors');
colors.enable();

console.clear();

// console.log(argv);

//console.log('base: yargs',argv.b);

// option('l')
// listar
// boolean
// deafault: false

// const [,,arg3= 'base=5'] = process.argv;
// const [, base = 5] = arg3.split('=');

// console.log(base);

//const base = 3;

crearArchivo(argv.b,argv.l,argv.h)
    .then( nombreArchivo => console.log(colors.green(nombreArchivo)))
    .catch(err => console.log(err));
