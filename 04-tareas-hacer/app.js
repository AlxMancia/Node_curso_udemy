require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
// const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();
//dasda
const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();


    if(tareasDB){
        //Establecer tareas
        tareas.cargarTareasFromArray(tareasDB);
    }


    do{
        opt = await inquirerMenu();
        //console.log({opt});


        
        switch (opt){
            case '1':
                //Crear tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;

            case '2':
                //Listar tareas
                tareas.listadoCompleto();
                // console.log(tareas.listadoArr);
            break;

            case '3':
                tareas.listarPendientesCompletadas();
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                console.log(ids);
                tareas.toggleCompletado(ids);
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if( id !== '0' ){
                    const ok = await confirmar('Estas seguro que quieres borrar?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }

                }
            break;

            default:
            break;

        }

        guardarDB(tareas.listadoArr);
      


       await pausa();
    }while(opt !== '0');



}

main();