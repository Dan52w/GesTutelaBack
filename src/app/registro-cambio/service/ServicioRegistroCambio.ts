import { Response } from "express";
import supabase from "../../../config/connection/supabaseClient";
import RegistroCambio from "../model/RegistroCambio";

class ServicioRegistroCambio {
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("registroscambios")
                .select("*, codestado(*), codresultado(*)")
                .order("fechacambio", {ascending: true});
        
            if (error) {
                console.log("Error en obtener todos los Registro cambios", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Registro cambios obtenidos correctamente",
                data
            });
        } catch (error) {
            console.log("Error inesperado al obtener todos los Registro cambio", error);
            return res.status(500).json({error: "Error interno del servidor"})
        }
    }

    protected static async obtenerPorId(id: number, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("registroscambios")
                .select("*, codestado(*), codresultado(*)")
                .eq("coddocumento", id);
        
            if (error) {
                console.error("Error al obtener el Registro cambio:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "Registro cambio no encontrado" });
            }
        
            return res.status(200).json({
                message: "Registro cambio obtenido correctamente",
                data
            })
        } catch(error) {
            console.log("Error inesperado en obtener Registro cambio por ID:", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async obtenerEntreFechas(fechaIni: string, fechaFin: string, res: Response): Promise<any> {
        try {
            const { data , count , error } = await supabase
                .from("registroscambios")
                .select("*, codestado(*), codresultado(*)")
                .gte("fechacambio", fechaIni)
                .lte("fechacambio", fechaFin);
        
            if (error) {
                console.error("Error al obtener el Registro cambio:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "Registro cambio no encontrado" });
            }
        
            return res.status(200).json({
                message: "Registros cambios obtenido correctamente",
                cantidad: count,
                data
            })
        } catch(error) {
            console.log("Error inesperado en obtener Registro cambio por Fechas:", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async obtenerPorEstado(estado: string, res: Response): Promise<any> {
        try {
            const { data: estadoData, error: estadoError } = await supabase
                .from("estados")
                .select("id")
                .eq("nombre", estado)
                .single();
        
            if (estadoError || !estadoData) {
                return res.status(404).json({ error: "Estado no encontrado" });
            }
        
            const idEstado = estadoData.id;
        
            const { data, error, count } = await supabase
                .from("registroscambios")
                .select(`*, codestado(*), codresultado(*)`, { count: "exact" })
                .eq("codestado", idEstado);
        
            if (error) {
                console.error("Error al obtener el Registro cambio:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "No se encontraron Registro cambios para ese estado" });
            }
        
            return res.status(200).json({
                message: "Registro(s) cambio(s) obtenido(s) correctamente",
                cantidad: count,
                data
            });
        } catch (error) {
            console.error("Error inesperado en obtener Registro cambio por Estado:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async obtenerPorResultado(resultado: string, res: Response): Promise<any> {
        try {
            const { data: resultadoData, error: resultadoError } = await supabase
                .from("resultados")
                .select("id")
                .eq("nombre", resultado)
                .single();
        
            if (resultadoError || !resultadoData) {
                return res.status(404).json({ error: "Resultado no encontrado" });
            }
        
            const idresultado = resultadoData.id;
        
            const { data, error, count } = await supabase
                .from("registroscambios")
                .select(`*, codestado(*), codresultado(*)`, { count: "exact" })
                .eq("codresultado", idresultado);
        
            if (error) {
                console.error("Error al obtener el Registro cambio:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "No se encontraron Registro cambios para ese resultado" });
            }
        
            return res.status(200).json({
                message: "Registro(s) cambio(s) obtenido(s) correctamente",
                cantidad: count,
                data
            });
        } catch (error) {
            console.error("Error inesperado en obtener Registro cambio por Resultado:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async crearRegistroCambio(registroscambio: RegistroCambio, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("registroscambios")
                .insert([{codestado: registroscambio.codEstado,
                    codresultado: registroscambio.codResultado,
                    coddocumento: registroscambio.codDocumento,
                    observacion: registroscambio.observacion,
                    fechacambio: registroscambio.fechaCambio}]);
        
            if (error) {
                console.log("Error al crear Registro cambio", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Registro cambio creado correctamente"
            })
        } catch (error) {
            console.log("Error inesperado en crear Registro cambio", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async actualizarRegistroCambio(registroscambio: RegistroCambio, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("registroscambios")
                .update([{observacion: registroscambio.observacion}])
                .eq("id", registroscambio.id)
                .eq("codestado", registroscambio.codEstado)
                .eq("codresultado", registroscambio.codResultado)
                .eq("coddocumento", registroscambio.codDocumento);
        
            if (error) {
                console.error("Error al actualizar el Registro cambio:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Registro cambio actalizado correctamente",
                data
            });
        } catch (error) {
            console.log("Error inesperado en actualizar el Registro cambio", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }
}

export default ServicioRegistroCambio;