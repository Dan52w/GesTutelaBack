import { Request, Response } from "express";
import ServicioEstado from "../service/ServicioEstado";
import Estado from "../model/Estado";

class ControladorEstado extends ServicioEstado {
    public llamarObtenerTodos(req: Request, res: Response) {
        ServicioEstado.obtenerTodos(res);
    }

    public llamarObtenerPorId(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioEstado.obtenerPorId(id, res);
    }

    public llamarObtenerPorNombre(req: Request, res: Response) {
        const nombre = req.params.nombre;
        ServicioEstado.obtenerPorNombre(nombre, res);
    }

    public llamarCrearEstado(req: Request, res: Response) {
        const nombre = req.body.nombre;
        ServicioEstado.crearEstado(nombre, res);
    }

    public llamarActualizarEstado(req: Request, res: Response) {
        const oldNombre = new Estado(0, req.body.oldNombre);
        const newNombre = new Estado(0, req.body.newNombre);
        ServicioEstado.actualizarEstado(newNombre, oldNombre, res);
    }

    public llamarEliminarEstado(req: Request, res: Response) {
        const nombre = req.params.nombre;
        ServicioEstado.eliminarEstado(nombre, res);
    }
}

const controladorEstado = new ControladorEstado();
export default controladorEstado;