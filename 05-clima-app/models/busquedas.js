const fs = require('fs')

const axios = require('axios');

class Busquedas{
    historial = [];
    dbPath = './db/database.json'

    constructor(){
        // TODO: leer DB si existe
        this.leerDB();
    }

    get historialCapitalizado(){
        //Capitalizar


        return this.historial.map(lugar =>{
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase()+ p.substring(1));

            return palabras.join(' ');
        });
    }

    get paramsMapbox(){
        return{
            'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }
    get paramsOpenWeeather(){
        return{
            'appid':process.env.OPENWEATHER_KEY,
            'units':'metric',
            'lang':'es',
        }
    }

    async ciudad(lugar=''){
        //Peticion HTTP
        try{
            // const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Santa%20Tecla.json  ?
            let instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            let resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));


            
        }catch(error){
            // console.log(error);
            return [];
        }
      
    }

    async climaLugar(lat,lon){
        try{
            let instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeeather,lat,lon}
            })
            
            let resp = await instance.get();

            const {weather,main} = resp.data
            return{
                desc:weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
            
        }catch(error){
            
        }
    }
    
    agregarHistorial(lugar = ''){
        //prevenir ducplcidad
        if(this.historial.includes(lugar.toLocaleLowerCase() ) ){
            return;
        }

        this.historial = this.historial.splice(0,5);
        this.historial.unshift(lugar.toLocaleLowerCase());

        //Grabar en txt
        this.guardarDB();
    }

    guardarDB(){
        const payload ={
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath,JSON.stringify(payload))
    }
    
    leerDB(){
        //debe de existir
        //const info readfilesync...patch{encoding:'utf-8'}
        if( !fs.existsSync(this.dbPath) ){
            return null;
        }
        const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'});
        const data = JSON.parse(info);
  
        this.historial = data.historial;


    }

}


module.exports = Busquedas;