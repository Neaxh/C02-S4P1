//funciones para presentacion de los datos, organiza la informacion de los superheroes en un formato estrcuturado 

export function renderizarSuperheroe(superheroe) {
    return {
        _id: superheroe._id,
        nombreSuperheroe: superheroe.nombreSuperheroe,
        nombreReal: superheroe.nombreReal,
        edad: superheroe.edad,
        planetaOrigen: superheroe.planetaOrigen,
        debilidad: superheroe.debilidad,
        poder: superheroe.poder,
        aliado: superheroe.aliado,
        enemigo: superheroe.enemigo,
        creador: superheroe.creador,
        createdAt: superheroe.createdAt,
        updatedAt: superheroe.updatedAt
    };
}

export function renderizarListaSuperheroes(superheroes) {
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}
