import { Request, Response } from "express";
import ServicioDocumento from "../service/ServicioDocumento";
import Documento from "../model/Documento";
import path from "path";
import fs from "fs";

class ControladorDocumento extends ServicioDocumento{
    public llamarObtenerTodos(req: Request, res: Response) {
        ServicioDocumento.obtenerTodos(res);
    }

    public llamarObtenerPorId(req: Request, res: Response) {
        const id = Number(req.params.id);
        ServicioDocumento.obtenerPorId(id, res);
    }

    public llamarObtenerPorNombre(req: Request, res: Response) {
        const nombre = req.params.nombre;
        ServicioDocumento.obtenerPorNombre(nombre, res);
    }

    public llamarObtenerEntreFechas(req: Request, res: Response) {
        const fechaIni = req.body.fechaIni;
        const fechaFin = req.body.fechaFin;
        ServicioDocumento.obtenerEntreFechas(fechaIni, fechaFin, res);
    }

    public llamarObtenerPorDerecho(req: Request, res: Response) {
        const derecho = req.params.derecho;
        ServicioDocumento.obtenerPorDerecho(derecho, res);
    }

    public crearDocumento(req: Request, res: Response) {
        try {
            if (!req.file) {
                res.status(400).json({ mensaje: "No se subió ningún archivo" });
                return;
            }
        
            let nombre = req.body.nombre;
            //const codDerecho = Number(req.body.codDerecho);
        
            const fechaCreacion = new Date();
        
            // Formatear fecha para nombre del documento (sin espacios)
            const dia = String(fechaCreacion.getDate()).padStart(2, '0');
            const mes = String(fechaCreacion.getMonth() + 1).padStart(2, '0');
            const anio = fechaCreacion.getFullYear();
            const horas = String(fechaCreacion.getHours()).padStart(2, '0');
            const minutos = String(fechaCreacion.getMinutes()).padStart(2, '0');
            const segundos = String(fechaCreacion.getSeconds()).padStart(2, '0');
        
            const nombreHora = `${dia}-${mes}-${anio}_${horas}-${minutos}-${segundos}`;
            nombre = `${nombre}_${nombreHora}`.replace(/\s+/g, "-");
            nombre = nombre.replace(/[:.]/g, "-");
        
            // Ruta del archivo, también sin espacios
            let direccion = `./src/external_files/pdf/${req.file.filename}`.replace(/\s+/g, "-");
        
            // Fecha para guardar en formato ISO (tipo Date)
            const fechaYHora = new Date();
            const derecho = req.body.derecho;
            const accionado = req.body.accionado;
            // Crear objeto Documento
            const documento = new Documento(
                0,
                nombre,
                direccion,
                0,
                fechaYHora,
                accionado);

            ServicioDocumento.crearDocumento(documento, derecho, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: "Error al subir y guardar el documento", error });
        }
    }

    public async descargarDocumento(req: Request, res: Response): Promise<any> {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        const rutaRelativa = await ServicioDocumento.obtenerRuta(id);
        if (!rutaRelativa) {
            return res.status(404).json({ mensaje: "Documento no encontrado en la base de datos" });
        }

        // Ruta absoluta para que Express lo entienda
        const rutaAbsoluta = path.resolve(rutaRelativa.direccion);

        // Verificar si el archivo existe físicamente
        if (!fs.existsSync(rutaAbsoluta)) {
            return res.status(404).json({ mensaje: "Archivo no encontrado en el sistema de archivos" });
        }

        // Generar nombre de archivo desde la ruta original o un nombre genérico
        const nombreDescarga = path.basename(rutaRelativa.nombre);

        // Forzar la descarga
        res.download(rutaAbsoluta, nombreDescarga, (err) => {
            if (err) {
                console.error("Error al enviar archivo:", err);
                res.status(500).send("Error al descargar el archivo");
            }
        });
    } catch (error) {
        console.error("Error en la descarga:", error);
        res.status(500).json({ mensaje: "Error interno al descargar el archivo" });
    }
}

}

const controladorDocumento = new ControladorDocumento();
export default controladorDocumento;