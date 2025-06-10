import { Router } from "express";
import controladorRol from "../controller/ControladorRol";

class RutaRol {
    public rutaRolApi : Router;

    constructor() {
        this.rutaRolApi = Router();
        
        this.rutaRolApi.get("/getall", controladorRol.llamarObtenerTodos);
        this.rutaRolApi.get("/getid/:id", controladorRol.llamarObtenerPorId);
        this.rutaRolApi.get("/getname/:nombre", controladorRol.llamarObtenerPorNombre);
        this.rutaRolApi.post("/add", controladorRol.llamarCrearRol);
        this.rutaRolApi.delete("/delete/:nombre", controladorRol.llamarEliminarRol);
        this.rutaRolApi.put("/update", controladorRol.llamarActualizarRol);
    }
}

const rutaRol = new RutaRol();
export default rutaRol.rutaRolApi;