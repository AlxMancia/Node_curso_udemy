const empleados = [
    {
       id:1,
       nombre:'Alexis' 
    },
    {
        id:2,
        nombre:'Jenn' 
    },
    {
        id:3,
        nombre:'Annie' 
    }
];
const salarios = [
    {
       id:1,
       salario:1000
    },
    {
        id:2,
        salario:1200
    }
];

const getEmpleado = (id,callback) =>{
    const empleado = empleados.find( (e)=> e.id === id )?.nombre

    if(empleado) {
        callback(null,empleado);
    }else{
        callback(`Empleado con id ${id} no existe`);
    }
}

const getSalario = (id,callback)=>{
    const salario = salarios.find((e)=>e.id===id)?.salario;
    if(salario){
        callback(null,salario);
    }else{
        callback(`Salario con id ${id} no existe`);
    }

}

const id = 3;
getEmpleado(id ,(err,empleado)=>{

    if(err){
        console.log('ERROR!');
        return console.log(err);
    }

    getSalario(id,(err,salario)=>{
        if(err){
            console.log('ERROR!');
            return console.log(err);
        }
        console.log('El empleado: ',empleado,' tiene un salario de: ',salario);
    })

});



