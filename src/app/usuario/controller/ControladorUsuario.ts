import { Request, Response } from "express";
import ServicioUsuario from "../service/ServicioUsuario";
import Usuario from "../model/Usuario";
import { body } from "express-validator";

class ControladorUsuario extends ServicioUsuario {
    public llamarObtenerTodos(req: Request, res: Response) {
        ServicioUsuario.ObtenerTodos(res);
    }

    public llamarObtenerPorId(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioUsuario.obtenerPorId(id, res);
    }

    public llamarObtenerPorNombre(req: Request, res: Response) {
        const nombre = req.params.nombre;
        ServicioUsuario.obtenerPorNombre(nombre, res);
    }

    public llamarObtenerPorApellido(req: Request, res: Response) {
        const apellido = req.params.apellido;
        ServicioUsuario.obtenerPorApellido(apellido, res);
    }

    public llamarObtenerPorCedula(req: Request, res: Response) {
        const cedula = Number(req.params.cedula);
        ServicioUsuario.obtenerPorCedula(cedula, res);
    }

    public llamarObtenerPorRol(req: Request, res: Response) {
        const rol = req.params.rol;
        ServicioUsuario.obtenerPorRol(rol, res);
    }

    public llamarCrearUsuario(req: Request, res: Response) {
        const usuario = new Usuario(0,
            req.body.nombre,
            req.body.apellido,
            req.body.cedula,
            0,
            req.body.fechaNacimiento,
            req.body.telefono);
        const rol = req.body.rol;
        ServicioUsuario.crearUsuario(usuario, rol, res);
    }

    public llamarActualizarUsuario(req: Request, res: Response) {
        const newUsuario = new Usuario(0, 
            req.body.nombre, 
            req.body.apellido, 
            req.body.cedula, 
            0, 
            req.body.fechaNacimiento,
            req.body.telefono);
        const rol = req.body.rol;
        ServicioUsuario.actualizarUsuario(newUsuario, rol, res);
    }

    public llamarEliminarUsuario(req: Request, res: Response) {
        const cedula = Number(req.params.cedula);
        ServicioUsuario.eliminarUsuario(cedula, res);
    }
}

const controladorUsuario = new ControladorUsuario();
export default controladorUsuario;