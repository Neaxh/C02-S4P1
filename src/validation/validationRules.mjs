import { body } from 'express-validator';
const validarSuperheroe = [
    body('nombreSuperheroe')
        .notEmpty().withMessage('El nombre del superhéroe es obligatorio')
        .trim()
        .isLength({ min: 3 }).withMessage('El nombre del superhéroe debe tener al menos 3 caracteres')
        .isLength({ max: 60}).withMessage('El nombre del superhéroe no debe exceder los 60 caracteres'),
    body('nombreReal')
        .notEmpty().withMessage('El nombre real es obligatorio')
        .trim()
        .isLength({ min: 3 }).withMessage('El nombre del superhéroe debe tener al menos 3 caracteres')
        .isLength({ max: 60}).withMessage('El nombre del superhéroe no debe exceder los 60 caracteres'),
    body('edad')
        .isInt({ min: 0 }).withMessage('La edad debe ser un número entero positivo'),
    body('planetaOrigen')
        .notEmpty().withMessage('El planeta de origen es obligatorio'),
    body('debilidad')
        .notEmpty().withMessage('La debilidad es obligatoria'),
    body('poder')
        .isArray().withMessage('El poder debe ser un arreglo')
        .custom((arr) => arr.every(item => typeof item === 'string')).withMessage('El poder debe ser un arreglo de cadenas de texto')
        .custom((arr) => arr.every(item => item.trim().length >= 3)).withMessage('Cada elemento del poder debe tener al menos 3 caracteres')
        .custom((arr) => arr.every(item => item.trim().length <= 60)).withMessage('Cada elemento del poder no debe exceder los 60 caracteres')
        .customSanitizer((arr) => Array.isArray(arr) ? arr.map(item => item.trim()) : []),
    body('aliado')
        .notEmpty().withMessage('El aliado es obligatorio'),
    body('enemigo')
        .notEmpty().withMessage('El enemigo es obligatorio'),
    body('creador')
        .isArray().withMessage('El creador debe ser un arreglo')
        .custom((arr) => arr.every(item => typeof item === 'string')).withMessage('El poder debe ser un arreglo de cadenas de texto')
        .custom((arr) => arr.every(item => item.trim().length >= 3)).withMessage('Cada elemento del poder debe tener al menos 3 caracteres')
        .custom((arr) => arr.every(item => item.trim().length <= 60)).withMessage('Cada elemento del poder no debe exceder los 60 caracteres')
        .customSanitizer((arr) => Array.isArray(arr) ? arr.map(item => item.trim()) : []),
];
const validarEliminarPorAtributo = [
    body('nombreSuperheroe').notEmpty().withMessage('El nombre del superhéroe es obligatorio'),
    body('nombreReal').notEmpty().withMessage('El nombre real es obligatorio'),
];
export { validarSuperheroe, validarEliminarPorAtributo };
export default validarSuperheroe;