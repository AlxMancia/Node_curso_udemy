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

const getEmpleado = (id) =>{
    
    return new Promise( (resolve,reject)=>{
        const empleado = empleados.find( (e)=> e.id === id )?.nombre;
        //IF ternario esta es la forma: 
        (empleado) ? resolve(empleado) : reject(`No existe empleado con id ${id}`);
    });
}

const getSalario = (id)=>{
    return new Promise((resolve,reject)=>{
        const salario = salarios.find((e)=> e.id === id)?.salario;
        (salario) ? resolve(salario) : reject(`No existe el salario con id ${id}`);
    });

}

id = 3;
// getEmpleado(id)
//     .then(empleado => console.log(empleado) )
//     .catch(err => console.log(err));

// getSalario(id)
//     .then(salario=> console.log(salario))
//     .catch(err => console.log(err));
// FORMA FEA DE PROMESAS
// getEmpleado(id)
//     .then(empleado =>{

//         getSalario(id)
//             .then(salario=>{

//                 console.log('El empleado: ',empleado,' tiene un salario de: ',salario);

//             })
//             .catch(err=>console.log(err))

//     })
//     .catch(err => console.log(err))
//PROMESAS EN CADENA

let nombre;

getEmpleado(id)
    .then( empleado=> {
        nombre = empleado;
        return getSalario(id)
    })
    .then( salario=> console.log('El empleado:',nombre,'tiene un salario de: ',salario))
    .catch(err=>console.log(err));

