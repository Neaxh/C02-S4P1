//define el modelo de datos para superhero 
/* establece estructura y reglas de validacion para los elementos*/

import mongoose from "mongoose";

const superheroSchema = new mongoose.Schema({
    nombreSuperheroe:{ type: String, required: true},
    nombreReal:{ type: String, required: true},
    nombreSocial: { type: String },
    edad: {type: Number, required: true},
    planetaOrigen: {type: String, default:'Desconocido'},
    debilidad: String,
    poder: [String],
    habilidadEspecial: { type: String }, 
    aliado:[String],
    enemigo:[String],
    createdAt: {type: Date, default:Date.now},
    creador: { type: [String], required: true },
});
const SuperHero = mongoose.model('Superhéroe', superheroSchema, 'Grupo-14');
export default SuperHero;