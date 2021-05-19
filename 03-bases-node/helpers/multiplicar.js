const fs = require('fs');
const color = require('colors');
const crearArchivo = async(base = 5,listar = false,hasta=10) =>{
    try{
        
        let salida = '';
        for (let i = 1;i<=hasta;i++){
            salida += `${base} X ${i} = ${base*i}\n`;
        }
        if(listar){
            console.log('==================='.green);
            console.log(`    Tabla del ${color.yellow(base)}    `);
            console.log('==================='.green);
            console.log(salida);
        }  

        fs.writeFileSync( `./salida/tabla-${base}.txt`, salida );

        return `tabla-${base}.txt creado`;
    }catch(err){
        throw err;
    }
}

module.exports = {
    crearArchivo 
}