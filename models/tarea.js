const { v4: uuidv4 } = require('uuid');

class Tarea {

    constructor(desc) {//el this hace referencia a la instancia creada
        this.id = uuidv4(); // este es sincrono.
        this.descripcion = desc;
        this.completado = null;
    }

}

module.exports = Tarea;