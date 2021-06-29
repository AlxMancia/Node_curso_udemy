require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");



const main = async()=>{
    let opt = '';

    const busquedas = new Busquedas();

    do{
        opt = await inquirerMenu();
  

        switch(opt){
            case 1:
                //Mostrar mensaje
                const busqueda = await leerInput('Ciudad: ');

                //Buscar el lugar
                const lugares = await busquedas.ciudad(busqueda);
                
                //Seleccionar el lugar
                const id = await listarLugares(lugares);
                if(id==='0')continue;

                //guardar en db
                const lugarSel = lugares.find( l => l.id === id);
                busquedas.agregarHistorial(lugarSel.nombre);
                

                //Clima
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);


                //Mostrar Resultados
                console.clear();
                console.log('Informacion de la ciudad\n'.green);
                console.log('Ciudad: '.green + lugarSel.nombre);
                console.log('Lat: '.green + lugarSel.lat);
                console.log('Lng: '.green + lugarSel.lng);
                console.log('Temperatura: '.green + clima.temp);
                console.log('Minima: '.green+ clima.min);
                console.log('Maxima: '.green+ clima.max);
                console.log('Como esta el clima: '.green+ clima.desc);

                break;

                case 2:

                
                    busquedas.historialCapitalizado.forEach((lugar,i) =>{
                        const idx = `${i+1}.`.green;
                        console.log(`${idx} ${lugar}`);
                    })
                break;
        }


        if (opt !== 0 ) await pausa();
    }while(opt!==0)
  
}

main();