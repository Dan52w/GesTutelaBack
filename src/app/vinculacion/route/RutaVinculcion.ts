import { Router } from "express";
import controladorVinculacion from "../controller/ControladorVincunlacion";

class RutaVinculacion {
    public rutaVincilacionApi: Router;

    constructor () {
        this.rutaVincilacionApi = Router();

        this.rutaVincilacionApi.get("/getall", controladorVinculacion.llamarObtenerTodos);
        this.rutaVincilacionApi.get("/getvin/:tipovinculacion", controladorVinculacion.llamarObtenerPorVinculacion);
        this.rutaVincilacionApi.get("/getuserid/:id", controladorVinculacion.llamarObtenerPorUsuarioId);
        this.rutaVincilacionApi.get("/getusercc/:cc", controladorVinculacion.llamarObtenerPorUsuarioCedula);
        this.rutaVincilacionApi.get("/getiddoc/:id", controladorVinculacion.llamarObtenerPorIdDocumento);
        this.rutaVincilacionApi.post("/add", controladorVinculacion.llamarCrearVinculacion);

        this.rutaVincilacionApi.get("/getcc/:cedula", controladorVinculacion.xd);
    }
}

const rutaVincilacion = new RutaVinculacion();
export default rutaVincilacion.rutaVincilacionApi;