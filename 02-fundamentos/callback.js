

const getUsuarioByID = ( id, callback ) => {

    const usuario = {
        id,
        nombre: 'Alexis'
    }

    setTimeout(()=>{
        callback(usuario);
    },1500)

}

getUsuarioByID(12,(user)=>{
    console.log(user.nombre.toUpperCase());
    console.log(user.id);
});
// setTimeout(()=>{
//     console.log('Hola Mundo')
// },1000);