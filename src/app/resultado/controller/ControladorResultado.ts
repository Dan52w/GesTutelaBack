import { Request, Response } from "express";
import ServicioResultado from "../service/ServicioResultado";
import Resultado from "../model/Resultado";

class ControladorResultado extends ServicioResultado {
    public llamarObtenerTodos(req: Request, res: Response) {
        ServicioResultado.obtenerTodos(res);
    }

    public llamarObtenerPorId(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioResultado.obtenerPorId(id, res);
    }

    public llamarObternerPorNombre(req: Request, res: Response) {
        const nombre = req.params.nombre;
        ServicioResultado.obtenerPorNombre(nombre, res);
    }

    public llamarCrearResultado(req: Request, res: Response) {
        const nombre = req.body.nombre;
        ServicioResultado.crearResultado(nombre, res);
    }

    public llamarActualizarResultado(req: Request, res: Response) {
        const oldResultado = new Resultado(0, req.body.oldNombre);
        const newResultado = new Resultado(0, req.body.newNombre);
        ServicioResultado.actualizarResultado(oldResultado, newResultado, res);
    }

    public llamarEliminarResultados(req: Request, res: Response) {
        const nombre = req.params.nombre;
        ServicioResultado.elimanarResultado(nombre, res);
    }
}

const controladorResultado = new ControladorResultado();
export default controladorResultado;