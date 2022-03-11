require('colors'); //colocar las importaciones de paquetes primero
const { guardarInformacion, leerInformacion } = require('./helpers/gestionBD');
const { inquirerMenu, pausar, leerInput, listadoTareaBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
//estoy sacando esas funciones u objetos que se encuentran en el archivo helper/inquirer

const Tareas = require('./models/tareas');

const main = async () => {
    let opt = '';
    const tareas = new Tareas(); //instancia de las tareas
    const tareasDB = leerInformacion();
    if (tareasDB) { //cargar Tareas
        tareas.cargarTareasDesdeArreglo(tareasDB)
    }

    do {

        opt = await inquirerMenu(); //imprime el menu
        switch (opt) {
            case '1': // crear tarea
                const descripcion = await leerInput('Descripcion: ');
                tareas.crearTarea(descripcion)
                break;
            case '2': // listar todo
                tareas.listadoCompleto();
                // console.log(tareas.listadoArr)
                break;
            case '3': // listar completados
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': // listar pendientes
                tareas.listarPendientesCompletadas();
                break;
            case '5': //completado / pendiente
               const ids =  await mostrarListadoCheckList(tareas.listadoArr);
               tareas.toggleCompletadas(ids);
                break;
            case '6': // Borrar
                const id = await listadoTareaBorrar(tareas.listadoArr);
                console.log('');
                if(id !== '0'){
                    const ok = await confirmar('Estas seguro')
                    if(ok){
                        tareas.borrartarea(id)
                        console.log('\nTarea borrada'.rainbow)
                    }
                }
                break;
            case '0':
                console.log('\n Gracias')
                break;
        }
        guardarInformacion(tareas.listadoArr)
        if (opt !== '0') await pausar();
    } while (opt !== '0')
};

main();

