import { Router } from "express";
import controladorResultado from "../controller/ControladorResultado";

class RutaResultado {
    public rutaResultadoApi: Router;

    constructor () {
        this.rutaResultadoApi = Router();
    
        this.rutaResultadoApi.get("/getall", controladorResultado.llamarObtenerTodos);
        this.rutaResultadoApi.get("/get/:id", controladorResultado.llamarObtenerPorId);
        this.rutaResultadoApi.get("/get/:nombre", controladorResultado.llamarObternerPorNombre);
        this.rutaResultadoApi.post("/add", controladorResultado.llamarCrearResultado);
        this.rutaResultadoApi.put("/update", controladorResultado.llamarActualizarResultado);
        this.rutaResultadoApi.delete("/delete", controladorResultado.llamarEliminarResultados);
    }
}

const rutaResultado = new RutaResultado();
export default rutaResultado.rutaResultadoApi;