import { Request, Response } from "express";
import ServicioAsignacion from "../service/ServicioAsignacion";
import Asignacion from "../model/Asignacion";

class ControladorAsignacion extends ServicioAsignacion {
    public llamarObtenerTodos(req: Request, res: Response) {
        ServicioAsignacion.ObtenerTodos(res);
    }

    public llamarObtenerPorEstudiante(req: Request, res: Response) {
        const cedula = Number(req.params.cedula);
        ServicioAsignacion.obtenerPorEstudiante(cedula, res);
    }

    public llamarObtenerPorEstudianteId(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioAsignacion.obtenerPorEstudianteId(id, res);
    }

    public llamarObtenerPorProfesor(req: Request, res: Response) {
        const cedula = Number(req.params.cedula);
        ServicioAsignacion.obtenerPorProfesor(cedula, res);
    }

    public llamarObtenerEntreFechas(req: Request, res: Response) {
        const fechaIni = req.body.fechaIni;
        const fechaFin = req.body.fechaFin;
        ServicioAsignacion.obtenerEntreFechas(fechaIni, fechaFin, res);
    }

    public llamarCrearAsignacion(req: Request, res: Response) {
        const asignacion = new Asignacion(0, 
            req.body.idestudiante,
            req.body.idprofesor, 
            req.body.fechaasignacion);
        ServicioAsignacion.crearAsignacion(asignacion, res);
    }

    public llamarActualizarAsignacion(req: Request, res: Response) {
        const asignacion = new Asignacion(0, 
            req.body.idestudiante,
            req.body.idprofesor, 
            req.body.fechaasignacion);
        ServicioAsignacion.actualizarAsignacion(asignacion, res);
    }

    public llamarEliminarAsignacion(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioAsignacion.eliminarAsignacion(id, res);
    }
}

const controladorAsignacion = new ControladorAsignacion();
export default controladorAsignacion;