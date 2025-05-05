/*establece una interfaz que define métodos CRUD (Crear, Leer, Actualizar y Borrar) estándar y sirve como contrato
para asegurar que cualquier clase que implemente la interfaz cuente con estos metodos*/

class IRepository{
    obtenerPorId(id){
        throw new Error ("Método 'obtenerPorId()' no implementado");
    }
    obtenerTodos(){
        throw new Error ("Método 'obtenerTodos() no implementado");
    }
    buscarPorAtributo() {
        throw new Error("Método 'buscarPorAtributo()' no implementado");
    }
    obtenerMayoresDe30() {
        throw new Error("Método 'obtenerMayoresDe30()' no implementado");
    }
   
}

export default IRepository;