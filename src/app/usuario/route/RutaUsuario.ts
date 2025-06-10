import { Router } from "express";
import controladorUsuario from "../controller/ControladorUsuario";

class RutaUsuario {
    public rutaUsuarioApi: Router;

    constructor () {
        this.rutaUsuarioApi = Router();

        this.rutaUsuarioApi.get("/getall", controladorUsuario.llamarObtenerTodos);
        this.rutaUsuarioApi.get("/getname/:nombre", controladorUsuario.llamarObtenerPorNombre);
        this.rutaUsuarioApi.get("/getid/:id", controladorUsuario.llamarObtenerPorId);
        this.rutaUsuarioApi.get("/getlastname/:apellido", controladorUsuario.llamarObtenerPorApellido);
        this.rutaUsuarioApi.get("/getrol/:rol", controladorUsuario.llamarObtenerPorRol);
        this.rutaUsuarioApi.get("/getcedula/:cedula", controladorUsuario.llamarObtenerPorCedula);
        this.rutaUsuarioApi.post("/add", controladorUsuario.llamarCrearUsuario);
        this.rutaUsuarioApi.put("/update", controladorUsuario.llamarActualizarUsuario);
        this.rutaUsuarioApi.delete("/delete/:cedula", controladorUsuario.llamarEliminarUsuario);
    }
}

const rutaUsuario = new RutaUsuario();
export default rutaUsuario.rutaUsuarioApi;