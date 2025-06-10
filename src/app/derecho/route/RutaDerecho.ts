import { Router } from "express";
import controladorDerecho from "../controller/ControladorDerecho";

class RutaDerecho {
    public rutaDerechoApi : Router;

    constructor () {
        this.rutaDerechoApi = Router();
    
        this.rutaDerechoApi.get("/getall", controladorDerecho.llamarObtenerTodos);
        this.rutaDerechoApi.get("/getname/:nombre", controladorDerecho.llamarObtenerPorNombre);
        this.rutaDerechoApi.get("/getid/:id", controladorDerecho.llamarObtenerPorId);
        this.rutaDerechoApi.post("/add", controladorDerecho.llamarCrearDerecho);
        this.rutaDerechoApi.put("/update", controladorDerecho.llamarActualizarDerecho);
        this.rutaDerechoApi.delete("/delete/:nombre", controladorDerecho.llamarEliminarDerecho);
    }
}

const rutaDerecho = new RutaDerecho();
export default rutaDerecho.rutaDerechoApi;