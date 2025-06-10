import { Request, Response } from "express";
import ServicioTipoVinculacion from "../service/ServicioTipoVinculacion";
import TipoVinculacion from "../model/TipoVinculacion";

class ControladorTipoVinculacion extends ServicioTipoVinculacion {
    public llamarObtenerTodos(req: Request, res: Response) {
        ServicioTipoVinculacion.obtenerTodos(res);
    }

    public llamarObtenerPorId(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioTipoVinculacion.obtenerPorId(id, res);
    }

    public llamarObtenerPorNombre(req: Request, res: Response) {
        const nombre = req.params.nombre;
        ServicioTipoVinculacion.obtenerPorNombre(nombre, res);
    }

    public llamarCrearTipoVinculacion(req: Request, res: Response) {
        const nombre = req.body.nombre;
        ServicioTipoVinculacion.crearTipoVinculacion(nombre, res);
    }

    public llamarActualizarTipoVinculacion(req: Request, res: Response) {
        const oldTipoVinculacion = new TipoVinculacion(0 , req.body.oldNombre);
        const newTipoVinculacion = new TipoVinculacion(0, req.body.newNombre);
        ServicioTipoVinculacion.actualizarTipoVinculacion(newTipoVinculacion, oldTipoVinculacion, res);
    }

    public llamarEliminarTipoVinculacion(req: Request, res: Response) {
        const nombre = req.params.nombre;
        ServicioTipoVinculacion.eliminarTipoVinculacion(nombre, res);
    }
}

const controladorTipoVinculacion = new ControladorTipoVinculacion();
export default controladorTipoVinculacion;