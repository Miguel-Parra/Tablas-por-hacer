const fs = require('fs');
const pathArchivo = './db/data.json';

const guardarInformacion = (datos) => {
    fs.writeFileSync(pathArchivo, JSON.stringify(datos));
}

const leerInformacion = () => {
    if (!(fs.existsSync(pathArchivo))) return null;

    const informacion = fs.readFileSync(pathArchivo, {encoding: 'utf-8'});
    const datos = JSON.parse(informacion)
    return datos;
}

module.exports = {
    guardarInformacion,
    leerInformacion
}