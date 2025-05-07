import mongoose from "mongoose";
import { validationResult } from "express-validator";
// Validaciones de ObjectId.
export const validarObjectId = (paramName = 'id') => (req, res, next) => {
    const id = req.params[paramName];
    
    // Comprobar si el ID es "new", lo cual no es un ObjectId válido
    if (id === 'new') {
        return next(); // No validamos "new", solo pasamos al siguiente middleware
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: `El ID ${id} no es válido` });
    }
    next();
}
export function validarSuperheroe(req, res, next) {
    const errors = [];

    if (!req.body.nombreSuperheroe || req.body.nombreSuperheroe.length < 3) {
        errors.push({ msg: 'El nombre del superhéroe debe tener al menos 3 caracteres.' });
    }

    if (!req.body.poder || req.body.poder.length < 3) {
        errors.push({ msg: 'El poder debe tener al menos 3 caracteres.' });
    }

    // Validar otros campos si es necesario...

    if (errors.length > 0) {
        return res.render('superheroe/edit', { title: 'Editar Superhéroe', superheroe: req.body, errors });
    }

    next();
}
export const manejarErroresValidacion = (view = null) => (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Errores de validación:', errors.array());
        if (view) {
            return res.status(400).render(view, {
                title: 'Editar Superhéroe',
                superheroe: { ...req.body, _id: req.params.id }, // asegura que tenga el _id
                errors: errors.array()
            });
        }
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validación Personalizada por Atributo en el Body para Eliminar.
export const validarAtributosEliminar = (req, res, next) => {
    const { nombreSuperheroe, nombreReal } = req.body;
    if (!nombreSuperheroe && !nombreReal) {
        return res.status(400).json({ error: 'Debes proporcionar un atributo de tipo nombre para eliminar' });
    }
    if (nombreSuperheroe && typeof nombreSuperheroe !== 'string') {
        return res.status(400).json({ error: 'El atributo nombreSuperheroe debe ser una cadena de texto' });
    }
    if (nombreReal && typeof nombreReal !== 'string') {
        return res.status(400).json({ error: 'El atributo nombreReal debe ser una cadena de texto' });
    }
    next();
}