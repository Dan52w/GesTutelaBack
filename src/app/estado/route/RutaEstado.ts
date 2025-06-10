import { Router } from "express";
import controladorEstado from "../controller/ControladorEstado";

class RutaEstado {
    public rutaEstadoApi : Router;

    constructor() {
        this.rutaEstadoApi = Router();

        this.rutaEstadoApi.get("/getall", controladorEstado.llamarObtenerTodos);
        this.rutaEstadoApi.get("/getid/:id", controladorEstado.llamarObtenerPorId);
        this.rutaEstadoApi.get("/getname/:nombre", controladorEstado.llamarObtenerPorNombre);
        this.rutaEstadoApi.post("/add", controladorEstado.llamarCrearEstado);
        this.rutaEstadoApi.put("/update", controladorEstado.llamarActualizarEstado);
        this.rutaEstadoApi.delete("/delete/:nombre", controladorEstado.llamarEliminarEstado);
    }
}

const rutaEstado = new RutaEstado();
export default rutaEstado.rutaEstadoApi;