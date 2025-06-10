import { Request, Response } from "express";
import ServicioVinculacion from "../service/ServicioVinculacion";
import Vinculacion from "../model/Vinculacion";

class ControladorVinculacion extends ServicioVinculacion {
    public llamarObtenerTodos(req: Request, res: Response) {
        ServicioVinculacion.obtenerTodos(res);
    }

    public llamarObtenerPorIdDocumento(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioVinculacion.obtenerPorIdDoc(id, res);
    }

    public llamarObtenerPorVinculacion(req: Request, res: Response) {
        const tipVinculacion = req.params.tipovinculacion;
        ServicioVinculacion.obtenerPorVinculacion(tipVinculacion, res);
    }

    public llamarObtenerPorUsuarioId(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioVinculacion.obtenerPorUsuarioId(id, res);
    }

    public llamarObtenerPorUsuarioCedula(req: Request, res: Response) {
        const cedula = Number(req.params.cc)
        ServicioVinculacion.obtenerPorUsuarioCedula(cedula, res);
    }

    public llamarCrearVinculacion(req: Request, res: Response) {
        const vinculacion = new Vinculacion(req.body.codDocumento, 
            req.body.codUsuario, 
            0)
        const tipVin = req.body.vinculacion;
        ServicioVinculacion.crearVinculacion(vinculacion, tipVin, res);
    }

    public xd(req: Request, res: Response) {
        const cedula = Number(req.params.cedula);
        ServicioVinculacion.obtenerInfoCompletaPorCedula(cedula,res);
    }
}

const controladorVinculacion = new ControladorVinculacion();
export default controladorVinculacion;