import { Router } from "express";
import controladorAsignacion from "../controller/ControladorAsignacion";

class RutaAsignacion {
    public rutaAsignacionApi: Router;

    constructor () {
        this.rutaAsignacionApi = Router();

        this.rutaAsignacionApi.get("/getall", controladorAsignacion.llamarObtenerTodos);
        this.rutaAsignacionApi.get("/getstu/:cedula", controladorAsignacion.llamarObtenerPorEstudiante);
        this.rutaAsignacionApi.get("/getstuid/:id", controladorAsignacion.llamarObtenerPorEstudiante);
        this.rutaAsignacionApi.get("/getteach/:cedula", controladorAsignacion.llamarObtenerPorProfesor);
        this.rutaAsignacionApi.get("/getbtwdate", controladorAsignacion.llamarObtenerEntreFechas);
        this.rutaAsignacionApi.post("/add", controladorAsignacion.llamarCrearAsignacion);
        this.rutaAsignacionApi.put("/update", controladorAsignacion.llamarActualizarAsignacion);
        this.rutaAsignacionApi.delete("/delete/:id", controladorAsignacion.llamarEliminarAsignacion);
    }
}

const rutaAsignacion = new RutaAsignacion();
export default rutaAsignacion.rutaAsignacionApi;