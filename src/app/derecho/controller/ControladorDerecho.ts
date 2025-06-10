import { Request, Response } from "express";
import ServicioDerecho from "../service/ServicioDerecho";
import Derecho from "../model/Derecho";

class ControladorDerecho extends ServicioDerecho {
    public llamarObtenerTodos(req: Request, res: Response) {
        ServicioDerecho.obtenerTodos(res);
    }

    public llamarObtenerPorId(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioDerecho.obtenerPorId(id, res);
    }

    public llamarObtenerPorNombre(req: Request, res: Response) {
        const nombre = req.params.nombre;
        ServicioDerecho.obtenerPorNombre(nombre, res);
    }

    public llamarCrearDerecho(req: Request, res: Response) {
        const nombre = req.body.nombre;
        ServicioDerecho.crearDerecho(nombre, res);
    }

    public llamarActualizarDerecho(req: Request, res: Response) {
        const oldDerecho = new Derecho(0, req.body.oldNombre);
        const newDerecho = new Derecho(0, req.body.newNombre);
        ServicioDerecho.actualizarDerecho(newDerecho, oldDerecho, res);
    }

    public llamarEliminarDerecho(req: Request, res: Response) {
        const nombre = req.params.nombre;
        ServicioDerecho.eliminarDerecho(nombre, res);
    }
}

const controladorDerecho = new ControladorDerecho();
export default controladorDerecho;