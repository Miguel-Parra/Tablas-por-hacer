
/**
 * _listado
 * {'uuid-12-12-12: {id:12, desc: asd, completadoEn:2022}}
 * {'uuid-12-12-12: {id:12, desc: asd, completadoEn:2022}}
 * {'uuid-12-12-12: {id:12, desc: asd, completadoEn:2022}}\
 * No se uso directamente un arreglo porque son mas complicados de manejar
 */

const Tarea = require("./tarea");

class Tareas {

    get listadoArr() {
        const listaArreglo = [];
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listaArreglo.push(tarea)
        })
        return listaArreglo;
    }

    constructor() {
        this._listado = {};
    }

    borrartarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }

    }

    cargarTareasDesdeArreglo(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea
        })

    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea; //como este id siempre es diferente, entonces con cada instancia creada
        //creará una nueva propiedad por lo que parecería que es un arreglo
    }

    listadoCompleto() {
        console.log('');
        this.listadoArr.forEach((elemento, indice) => {
            const idx = `${indice + 1}`.green;
            const { descripcion, completado } = elemento;
            const estado = (completado) ? 'Completado'.green : 'Pendiente'.red;
            console.log(`${idx}. ${descripcion} :: ${estado}`);
        })

    }

    listarPendientesCompletadas(completadas = false) {
        console.log('');
        let contador = 0;
        this.listadoArr.filter((elemento) => {
            const { descripcion, completado } = elemento;
            const estado = (completado) ? 'Completado'.green : 'Pendiente'.red;
            if (completadas) {
                if (completado) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${descripcion} :: ${(completado.toString()).green}`);
                }
            } else {
                if (!completado) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${descripcion} :: ${estado}`);
                }
            }
        })
    }
    toggleCompletadas(ids = []) {
        this.listadoArr.forEach(tarea => {
            if (ids.includes(tarea.id)) {
                if (!(this._listado[tarea.id].completado)) {
                    this._listado[tarea.id].completado = new Date().toISOString();              }
               
            } else {
                this._listado[tarea.id].completado = null;
            }
        })
    }
}
module.exports = Tareas;