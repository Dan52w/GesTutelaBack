import { Response } from "express";
import supabase from "../../../config/connection/supabaseClient";
import Documento from "../model/Documento";

class ServicioDocumento {
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const { data , count , error } = await supabase
                .from("documentos")
                .select(`*, derecho:codDerecho ( nombre )`, { count: "exact" })
                .order("fechahora", {ascending: true})
        
            if (error) {
                console.log("Error al obtener todos los Documentos", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Documentos obtenidos correctamente",
                cantidad: count,
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener todos los Documentos: ", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    } 

    protected static async obtenerPorId(id: number, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("documentos")
                .select(`*, derecho:codDerecho ( nombre )`)
                .eq("id", id);
        
            if (error) {
                console.error("Error al obtener el Documento:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "Documento no encontrado" });
            }
        
            return res.status(200).json({
                message: "Documento obtenido correctamente",
                data
            })
        } catch(error) {
            console.log("Error inesperado en obtener Documento por ID:", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async obtenerPorNombre(nombre: string, res: Response): Promise<any> {
        try {
            const { data , count , error } = await supabase
                .from("documentos")
                .select(`*, derecho:codDerecho ( nombre )`, { count: "exact" })
                .like("nombre", `%${nombre}%`);
        
            if (error) {
                console.error("Error al obtener el Documento:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "Documento no encontrado" });
            }
        
            return res.status(200).json({
                message: "Documento obtenido correctamente",
                cantidad: count,
                data
            })
        } catch(error) {
            console.log("Error inesperado en obtener Documento por nombre:", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async obtenerRuta(id: number): Promise<any> {
        try {
            const { data, error } = await supabase
                .from("documentos")
                .select("direccion, nombre")
                .eq("id", id)
                .single();
        
            if (error || !data) {
                console.error("Error al obtener ruta del Documento:", error);
                return null;
            }
        
            return data; // devuelve la ruta como string
        } catch (error) {
            console.log("Error inesperado en obtener ruta del Documento:", error);
            return null;
        }
    }

    protected static async obtenerEntreFechas(fechaIni: string, fechaFi: string, res: Response): Promise<any> {
        try {
            const fechaInicio = `${fechaIni}T00:00:00`;
            const fechaFin = `${fechaFi}T23:59:59`;
        
            const { data , count , error } = await supabase
                .from("documentos")
                .select(`*, derecho:codDerecho ( nombre )`, { count: "exact" })
                .gte("fechahora", fechaInicio)
                .lte("fechahora", fechaFin);
        
            if (error) {
                console.error("Error al obtener el Documento:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "Documento no encontrado" });
            }
        
            return res.status(200).json({
                message: "Documento(s) obtenido(s) correctamente",
                cantidad: count,
                data
            });
        } catch (error) {
            console.log("Error inesperado en obtener Documento por fecha:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async obtenerPorDerecho(nombreDerecho: string, res: Response): Promise<any> {
        try {
            const { data: derechoData, error: derechoError } = await supabase
                .from("derechos")
                .select("id")
                .eq("nombre", nombreDerecho)
                .single();
        
            if (derechoError || !derechoData) {
                return res.status(404).json({ error: "Derecho no encontrado" });
            }
            
            const idDerecho = derechoData.id;
        
            const { data, error, count } = await supabase
                .from("documentos")
                .select(`*,derechos (nombre)`, { count: "exact" })
                .eq("codDerecho", idDerecho);
        
            if (error) {
                console.error("Error al obtener el Documento:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "No se encontraron documentos para ese derecho" });
            }
        
            return res.status(200).json({
                message: "Documento(s) obtenido(s) correctamente",
                cantidad: count,
                data
            });
        } catch (error) {
            console.error("Error inesperado en obtener Documento por Derecho:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }


    protected static async crearDocumento(documento: Documento, derecho: string, res: Response): Promise<any> {
        try {
            const count = await this.contarDocumento(documento.nombre);
        
            if (count != 0) {
                return res.status(409).json({error: "El documento ya existe"});
            }
        
            const { data: derechoData, error: derechoError } = await supabase
                .from("derechos")
                .select("id")
                .eq("nombre", derecho)
                .single();
        
            if (derechoError || !derechoData) {
                return res.status(404).json({ error: "Derecho no encontrado" });
            }
            
            const idDerecho = derechoData.id;
        
            const { data , error} = await supabase
                .from("documentos")
                .insert([{
                nombre: documento.nombre,
                direccion: documento.direccion,
                fechahora: documento.fechaHora,
                codDerecho: idDerecho,
                accionado: documento.accionado}])
                .select();
        
            if (error) {
                console.error("Error al crear el Documento:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Documento creado correctamente",
                data
            });
        } catch (error) {
            console.error("Error inesperado en crear Documento:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async actualizarDocumento(newDocumento: Documento, oldDocumento: Documento, res: Response): Promise<any> {
        try {
            const countNew = await this.contarDocumento(newDocumento.nombre);
        
            if (countNew != 0) {
                return res.status(409).json({error: "El documento ya existe: ", newDocumento});
            }
        
            const countOld = await this.contarDocumento(oldDocumento.nombre);
        
            if (countOld === 0) {
                return res.status(404).json({ error: "El documento no existe", oldDocumento });
            }
        
            const { data , error } = await supabase
                .from("documentos")
                .update([{nombre: newDocumento.nombre,
                direccion: newDocumento.direccion,
                fechahora: newDocumento.fechaHora,
                codDerecho: newDocumento.derecho,
                accionado: newDocumento.accionado}])
                .eq("nombre", oldDocumento.nombre);
        
            if (error) {
                console.error("Error al actualizar el Documento:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Documento actalizado correctamente",
                documento: " " + newDocumento.nombre + " " + newDocumento.derecho + " " + newDocumento.fechaHora,
                data
            });
        } catch (error) {
            console.error("Error inesperado en actualizar Documento:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async eliminarDocumento(id: number, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("documento")
                .delete()
                .eq("id", id)
        
            if (error) {
                console.error("Error al eliminar el Documento:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Documento eliminado correctamente",
            })
        } catch (error) {
            console.error("Error inesperado al eliminar Documento:", error);
            return res.status(500).json({ error: "Error inesperado del servidor"});
        }
    }

    private static async contarDocumento(nombre: string): Promise<number> {
        const { count , error } = await supabase
            .from("documentos")
            .select("*", {count: "exact", head: true})
            .eq("nombre", nombre);
    
        if (error) {
            console.log("Error al contar documentos:", error);
            throw new Error("Error al contar documentos");
        }

        return count ?? 0;
    }
}

export default ServicioDocumento;