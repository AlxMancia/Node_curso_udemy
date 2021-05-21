require('colors');
const Tarea = require("./tarea");

class Tareas {
 
    _listado = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas = []){
       tareas.forEach(tarea =>{
           this._listado[tarea.id] = tarea;
       });
       
       
        // MI CODIGO
        // const listado = [];
        // Object.keys(tareas).forEach(key=>{
        //     const tarea = tareas[key];
        //     listado.push(tarea);
        // })
        // console.log(listado);

    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log('\n');
        this.listadoArr.forEach((tarea, index) =>{
            // console.log(this._listado);
            let indexs = `${index+1}`.green;
            //Usa esto, es desestructuracion, es mas rapido y se ve mejor
            let {desc,completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${indexs}. ${desc} :: ${estado}`)
        });
    }

    listarPendientesCompletadas( completadas = true ){
        console.log('\n');
        let index = 0;

        this.listadoArr.forEach(tarea=>{
            //let indexs = `${index+1}`.green;
            //Usa esto, es desestructuracion, es mas rapido y se ve mejor
            let {desc,completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            
            if(completadas && completadoEn){
                index += 1;
                console.log(`${index.toString().green}. ${desc} :: ${completadoEn.green}`);
            }
            else if(!completadas && !completadoEn){
                index += 1;
                console.log(`${index.toString().green}. ${desc} :: ${estado}`);
            }
        });
    }

    toggleCompletado(ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }

}

module.exports = Tareas;