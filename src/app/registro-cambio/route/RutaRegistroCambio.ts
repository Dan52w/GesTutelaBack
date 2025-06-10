import { Router } from "express";
import controladorRegistroCambio from "../controller/ControladorRegistroCambio";

class RutaRegistroCambio {
    public rutaRegistroCambioApi: Router;

    constructor () {
        this.rutaRegistroCambioApi = Router();

        this.rutaRegistroCambioApi.get("/getall", controladorRegistroCambio.llamarObtenerTodos);
        this.rutaRegistroCambioApi.get("/getestado/:estado", controladorRegistroCambio.llamarObtenerPorEstado);
        this.rutaRegistroCambioApi.get("/getresult/:resultado", controladorRegistroCambio.llamarObtenerPorResultado);
        this.rutaRegistroCambioApi.get("/getid/:id", controladorRegistroCambio.llamarObtenerPorId);
        this.rutaRegistroCambioApi.get("/getbtwdate", controladorRegistroCambio.llamarObtenerEntreFechas);
        this.rutaRegistroCambioApi.post("/add", controladorRegistroCambio.llamarCrearRegistroCambio);
        this.rutaRegistroCambioApi.put("/update", controladorRegistroCambio.llamarActualizarRegistroCambio);
    }
}

const rutaRegistroCambio = new RutaRegistroCambio();
export default rutaRegistroCambio.rutaRegistroCambioApi;