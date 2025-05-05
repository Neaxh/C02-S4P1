// Gestionar las solicitudes HTTP, llamando a los servidores correspondientes y utilizando las vistas para presentar los datos
import { Router } from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    mostrarFormularioCrearSuperheroeController,
    actualizarSuperheroeController,
    mostrarFormularioActualizarSuperheroeController,
    mostrarFormularioEliminarSuperheroeController,
    eliminarSuperheroePorAtributoController,
    eliminarSuperheroeController,homeController,
} from '../controllers/superheroesController.mjs';

import { validarSuperheroe, validarEliminarPorAtributo } from '../validation/validationRules.mjs';
import { manejarErroresValidacion, validarObjectId } from '../validation/errorMiddleware.mjs';

import SuperHero from '../models/SuperHero.mjs'; // IMPORTANTE: para usar en el dashboard

const router = Router();

// -------------------------------
// RUTA PARA MOSTRAR EL DASHBOARD CON TODOS LOS SUPERHÉROES
router.get('/dashboard', async (req, res) => {
    try {
        const superheroes = await SuperHero.find();
        res.render('dashboard', { superheroes }); // Renderiza la vista con los datos
    } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        res.status(500).send('Error al cargar el dashboard');
    }
});


// -------------------------------
// FORMULARIO CREAR SUPERHÉROE
router.get('/heroes/new', mostrarFormularioCrearSuperheroeController);

// CREAR SUPERHÉROE
router.post('/heroes', crearSuperheroeController);

// FORMULARIO ELIMINAR SUPERHÉROE POR ATRIBUTO
router.get("/heroes/deleteAttribute", mostrarFormularioEliminarSuperheroeController);


// ELIMINAR SUPERHÉROE POR ATRIBUTO
router.post("/heroes/deleteAttribute", eliminarSuperheroePorAtributoController);

// ELIMINAR SUPERHÉROE POR ID
router.delete('/heroes/:id/delete',
    (req, res, next) => {
        console.log('Middleware validarObjectId ejecutado', req.params.id);
        next();
    },
    validarObjectId(),
    manejarErroresValidacion(),
    eliminarSuperheroeController
);

// FORMULARIO ACTUALIZAR SUPERHÉROE
router.get('/heroes/:id/edit', validarObjectId(), mostrarFormularioActualizarSuperheroeController);

// ACTUALIZAR SUPERHÉROE
router.post('/heroes/:id',
    (req, res, next) => {
        console.log('Middleware validarObjectId ejecutado');
        next();
    },
    validarObjectId(),
    validarSuperheroe,
    actualizarSuperheroeController
);

//endpoint para mostrar Pagina Principal
router.get('/home',homeController);


// -------------------------------
// RUTAS GET para obtener superhéroes
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

export default router;
