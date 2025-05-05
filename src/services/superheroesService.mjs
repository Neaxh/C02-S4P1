//implementa la logica de negocio, utiliza metodos del repositorio para recaudar,buscar y filtrar datos


import superHeroRepository from "../repositories/SuperHeroRepository.mjs";

// Obtener superhéroe por id
export async function obtenerSuperheroePorId(id){
    return await superHeroRepository.obtenerPorId(id);

}

// Obtener todos los superhéroes
export async function obtenerTodosLosSuperheroes(){
    return await superHeroRepository.obtenerTodos();

}

// Buscar superhéroes por atributo
export async function buscarSuperheroesPorAtributo(atributo,valor){
    return await superHeroRepository.buscarPorAtributo(atributo,valor);
}

// Busca superhéroes mayores a 30 años

export async function obtenerSuperheroesMayoresDe30() {
    try {
        return await superHeroRepository.obtenerMayoresDe30();
    } catch (error) {
        console.error('Error al obtener superhéroes mayores de 30 años:', error);
        throw error;
    }
}

//--------------------------------
// Rutas CRUD.
// Crear Superhéroe.
export async function crearSuperheroe(data) {
    return await superHeroRepository.crear(data);
}
// Actualizar Superhéroe.
export async function actualizarSuperheroe(id, data) {
    return await superHeroRepository.actualizar(id, data);
}
// Eliminar Superhéroe.
export async function eliminarSuperheroe(id) {
    return await superHeroRepository.eliminar(id);
}
// Eliminar Superhéroe por Atributo.
export async function eliminarPorNombreSuperheroe(nombreSuperheroe) {
    return await superHeroRepository.eliminarPorNombreSuperheroe(nombreSuperheroe);
}
export async function eliminarPorNombreReal(nombreReal) {
    return await superHeroRepository.eliminarPorNombreReal(nombreReal);
}