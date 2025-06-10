import { Request, Response } from "express";
import ServicioRegistroCambio from "../service/ServicioRegistroCambio";
import RegistroCambio from "../model/RegistroCambio";

class ControladorRegistroCambio extends ServicioRegistroCambio {
    public llamarObtenerTodos(req: Request, res: Response) {
        ServicioRegistroCambio.obtenerTodos(res);
    }

    public llamarObtenerPorId(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioRegistroCambio.obtenerPorId(id, res);
    }

    public llamarObtenerEntreFechas(req: Request, res: Response) {
        const fechaIni = req.body.fechaIni;
        const fechaFin = req.body.fechaFin;
        ServicioRegistroCambio.obtenerEntreFechas(fechaIni, fechaFin, res);
    }

    public llamarObtenerPorEstado(req: Request, res: Response) {
        const estado = req.params.estado;
        ServicioRegistroCambio.obtenerPorEstado(estado, res);
    }

    public llamarObtenerPorResultado(req: Request, res: Response) {
        const resultado = req.params.estado;
        ServicioRegistroCambio.obtenerPorResultado(resultado, res);
    }

    public llamarCrearRegistroCambio(req: Request, res: Response) {
        const fechaCambio = new Date();
        const registroCambio = new RegistroCambio(0,
            req.body.codDocumento,
            1,
            1,
            req.body.observacion,
            fechaCambio);
        ServicioRegistroCambio.crearRegistroCambio(registroCambio, res);
    }

    public llamarActualizarRegistroCambio(req: Request, res: Response) {
        const registroCambio = new RegistroCambio(0,
            req.body.codDocumento,
            req.body.codEstado,
            req.body.codResultado,
            req.body.observacion,
            req.body.fechaCambio);
        ServicioRegistroCambio.actualizarRegistroCambio(registroCambio, res);
    }
}

const controladorRegistroCambio = new ControladorRegistroCambio();
export default controladorRegistroCambio;