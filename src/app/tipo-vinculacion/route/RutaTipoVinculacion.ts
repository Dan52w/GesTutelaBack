import { Router } from "express";
import controladorTipoVinculacion from "../controller/ControladorTipoVinculacion";

class RutaTipoVinculacion {
    public rutaTipoVinculacionApi : Router;

    constructor () {
        this.rutaTipoVinculacionApi = Router();
    
        this.rutaTipoVinculacionApi.get("/getall", controladorTipoVinculacion.llamarObtenerTodos);
        this.rutaTipoVinculacionApi.get("/getid/:id", controladorTipoVinculacion.llamarObtenerPorId);
        this.rutaTipoVinculacionApi.get("/getname/:nombre", controladorTipoVinculacion.llamarObtenerPorNombre);
        this.rutaTipoVinculacionApi.post("/add", controladorTipoVinculacion.llamarCrearTipoVinculacion);
        this.rutaTipoVinculacionApi.put("/update", controladorTipoVinculacion.llamarActualizarTipoVinculacion);
        this.rutaTipoVinculacionApi.delete("/delete", controladorTipoVinculacion.llamarEliminarTipoVinculacion);
    }
}

const rutaTipoVinculacion = new RutaTipoVinculacion();
export default rutaTipoVinculacion.rutaTipoVinculacionApi;