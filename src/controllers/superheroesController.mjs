import {
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
    crearSuperheroe,
    actualizarSuperheroe,
    eliminarSuperheroe,
    eliminarPorNombreSuperheroe,
    eliminarPorNombreReal
} from "../services/superheroesService.mjs";


import {
    renderizarListaSuperheroes,
    renderizarSuperheroe
} from "../views/responseView.mjs";



// -------- GET ----------

export async function obtenerSuperheroePorIdController(req, res) {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if (superheroe) {
        res.render('dashboard', { superheroes: [renderizarSuperheroe(superheroe)] });
    } else {
        res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    const superheroes = await obtenerTodosLosSuperheroes();
    res.render('dashboard', { 
        title: 'Lista de Héroes', 
        superheroes: renderizarListaSuperheroes(superheroes) 
     });
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (superheroes.length > 0) {
            res.render('dashboard', { superheroes: renderizarListaSuperheroes(superheroes) });
        } else {
            res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
        }
    } catch (error) {
        res.status(500).send('Error al buscar superhéroes por atributo');
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        res.status(200).send(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(500).send('Error al obtener superhéroes mayores de 30 años');
    }
}

// -------- FORMULARIOS ----------
export async function mostrarFormularioCrearSuperheroeController(req, res) {
    try {
        res.render('superheroe/new', { title: 'Crear Superhéroe', errors: [] });
    } catch (error) {
        res.status(500).send({ message: 'Error al mostrar formulario de creación', error: error.message });
    }
}

export async function mostrarFormularioActualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send({ message: 'Superhéroe no encontrado' });
        }

        res.render('superheroe/edit', { title: 'Editar Superhéroe', superheroe, errors: [] });
    } catch (error) {
        res.status(500).send({ message: 'Error al mostrar formulario de actualización', error: error.message });
    }
}

export async function mostrarFormularioEliminarSuperheroeController(req, res) {
    try {
        res.render('superheroe/delete', { title: 'Eliminar Superhéroe', errors: [] });
    } catch (error) {
        res.status(500).send({ message: 'Error al mostrar formulario de eliminación', error: error.message });
    }
}


// -------- CRUD ----------
export async function crearSuperheroeController(req, res) {
    try {
        const { nombreSuperheroe, nombreReal, edad, planetaOrigen, debilidad, poder, aliado, enemigo, creador } = req.body;
        const superheroeCreado = await crearSuperheroe({
            nombreSuperheroe, nombreReal, edad, planetaOrigen, debilidad, poder, aliado, enemigo, creador
        });

        if (!superheroeCreado) {
            return res.status(400).render("mensaje", { mensaje: "Error al crear superhéroe" });
        }

        res.render("mensaje", { mensaje: "Superhéroe creado exitosamente" });
    } catch (error) {
        res.status(500).render("mensaje", { mensaje: `Error al crear superhéroe: ${error.message}` });
    }
}

    
// Actualizar Superhéroe.
export async function eliminarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroe(id);

        if (!superheroeEliminado) {
            return res.status(404).render("mensaje", { mensaje: "Superhéroe no encontrado" });
        }

        res.render("mensaje", { mensaje: "Superhéroe eliminado exitosamente" });
    } catch (error) {
        res.status(500).render("mensaje", { mensaje: `Error al eliminar superhéroe: ${error.message}` });
    }
}




export async function eliminarSuperheroeController(req, res) {
    console.log("Controlador de Eliminar por ID:", req.params.id);

    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroe(id);

        if (!superheroeEliminado) {
            return res.status(404).send({ message: 'Superhéroe no encontrado' });
        }

        res.status(200).send({ message: 'Superhéroe eliminado exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar superhéroe', error: error.message });
    }
}


export const eliminarSuperheroePorAtributoController = async (req, res) => {
    const { nombreSuperheroe, nombreReal } = req.body;

    try {
        if (nombreSuperheroe) {
            const resultado = await eliminarPorNombreSuperheroe(nombreSuperheroe);

            if (!resultado) {
                return res.render("superheroe/delete", {
                    errors: [{ msg: "No se encontró ningún superhéroe con ese nombre." }]
                });
            }

        } else if (nombreReal) {
            const resultado = await eliminarPorNombreReal(nombreReal);

            if (!resultado) {
                return res.render("superheroe/delete", {
                    errors: [{ msg: "No se encontró ningún superhéroe con ese nombre real." }]
                });
            }

        } else {
            return res.render("superheroe/delete", {
                errors: [{ msg: "Debe ingresar al menos un campo." }]
            });
        }

        res.redirect("/api/heroes");

    } catch (error) {
        console.error("Error eliminando por atributo:", error);
        res.status(500).render("superheroe/delete", {
            errors: [{ msg: "Error interno del servidor." }]
        });
    }
};

export function homeController(req, res) {
    res.render('index', { title: 'Pagina Principal' });
}



