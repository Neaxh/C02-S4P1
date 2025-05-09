/* implementa los metodos definidos en la interfaz*/
import SuperHero from "../models/SuperHero.mjs";
 // Importa el modelo SuperHero, que representa la estructura de los datos de un superhéroe
import IRepository from "./IRepository.mjs";
// Importa la interfaz IRepository que define los métodos requeridos



// Define la clase SuperHeroRepository que extiende IRepository, lo cual significa que debe implementar sus métodos
class SuperHeroRepository extends IRepository{
  async obtenerPorId(id){
    return await SuperHero.findById(id); // / Usa findById del modelo SuperHero para buscar por ID en la base de datos
  
  }

  async obtenerTodos() {
    return await SuperHero.find({ nombreSuperheroe: { $exists: true } });
  }

  async buscarPorAtributo(atributo,valor){
    return await SuperHero.find({ [atributo]: valor }); // Usa find con condiciones para determinado atributo y valor
  }

  async obtenerMayoresDe30() {
     return await SuperHero.find({ edad: { $gt: 30 } , planetaOrigen:"Tierra", poder: { $type: "array" },  
      $expr: { 
        $gte: [{ $size: "$poder" }, 2]  
    }});
  }

  //------------------------------------------
  async crearSuperheroe(datosSuperheroe) {

    /* SuperHero.create(datosSuperheroe);
    const superheroeCreado = await SuperHero.find({ nombreSuperHeroe: datosSuperheroe.nombreSuperHeroe });

    console.log(`Superheroe: ${superheroeCreado}`);
    return superheroeCreado; */

    const nuevoHeroe = new SuperHero(datosSuperheroe);
    //console.log(nuevoHeroe);
    return await nuevoHeroe.save();

  }

  //    Actualizar Heroe    //
  async crear(data) {
    return await SuperHero.create(data);
  }
  async actualizar(id, data) {
      return await SuperHero.findByIdAndUpdate(id, data, { new: true, runValidators: true }); // new: true devuelve el documento actualizado, runValidators aplica las validaciones del esquema.
  }
  async eliminar(id) {
      return await SuperHero.findByIdAndDelete(id);
  }
  async eliminarPorNombreSuperheroe(nombreSuperheroe) {
      console.log("Eliminando Superheroe por nombreSuperheroe:", nombreSuperheroe);
      return await SuperHero.findOneAndDelete({ nombreSuperheroe });
  }
  async eliminarPorNombreReal(nombreReal) {
      console.log("Eliminando Superheroe por nombreReal:", nombreReal);
      return await SuperHero.findOneAndDelete({ nombreReal }); heroeEliminado;
    }
}

// Exporta una instancia de SuperHeroRepository para que pueda ser utilizada directamente en otros módulos
export default new SuperHeroRepository();
