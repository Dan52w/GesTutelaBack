import { Request, Response } from "express";
import ServicioRol from "../service/ServicioRol";
import Rol from "../model/Rol";

class ControladorRol extends ServicioRol {
    public llamarCrearRol(req: Request, res: Response) {
        const nombre = req.body.nombre;
        ServicioRol.crearRol(nombre, res);
    }

    public llamarActualizarRol(req: Request, res: Response) {
        const oldRol = new Rol(0, req.body.oldNombre);
        const newRol = new Rol(0, req.body.newNombre);
        ServicioRol.actualizarRol(newRol, oldRol, res);
    }

    public llamarEliminarRol(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioRol.eliminarRol(id, res);
    }

    public llamarObtenerTodos(req: Request, res: Response) {
        ServicioRol.obtenerTodos(res);
    }

    public llamarObtenerPorId(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioRol.obtenerPorId(id, res);
    }

    public llamarObtenerPorNombre(req: Request, res: Response) {
        const nombre = req.params.nombre;
        ServicioRol.obtenerPorNombre(nombre, res);
    }
}

const controladorRol = new ControladorRol();
export default controladorRol;