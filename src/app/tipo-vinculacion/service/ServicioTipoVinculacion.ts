import { Response } from "express";
import supabase from "../../../config/connection/supabaseClient";
import TipoVinculacion from "../model/TipoVinculacion";

class ServicioTipoVinculacion {
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("tipovinculaciones")
                .select("*")
                .order("id", { ascending: true });
        
            if (error) {
                console.log("Error al obtener todos los Tipos de Vinculaciones", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Tipos vinculaciones obtenidos correctamente",
                data
            })
        } catch (error) {
            console.error("Error inesperado en obtener todos los Tipos de Vinculacion:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    protected static async obtenerPorId(id: number, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("tipovinculaciones")
                .select("*")
                .eq("id", id)
                .single();
        
            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: "Tipo vinculacion no encontrado" });
                }
            
                console.error("Error al obtener el Tipo vinculacion:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Tipo vinculacion obtenido correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado en obtener tipo de vinculacion por ID", error);
            res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async obtenerPorNombre(nombre: string, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("tipovinculaciones")
                .select("*")
                .eq("nombre", nombre);
        
            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: "Tipo vinculacion no encontrado" });
                }
            
                console.error("Error al obtener el Tipo vinculacion:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Tipo de vinculacion obtenido correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener Tipo de Vinculacion por Nombre", error);
            res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async crearTipoVinculacion(nombre: string, res: Response): Promise<any> {
        try {
            const count = await this.contarTipoVinculacion(nombre);
        
            if (count != 0) {
                return res.status(409).json({ error: "El tipo vinculacion ya existe" });
            }
        
            const { data , error } = await supabase
                .from("tipovinculaciones")
                .insert([{nombre}]);
        
            if (error) {
                console.error("Error al crear el Tipo de vinculacion:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Tipo vinculacion creado correctamente",
                nombre
            })
        } catch (error) {
            console.log("Error inesperado al crear Tipo de Vinculacion", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async actualizarTipoVinculacion(newTipoVinculacion: TipoVinculacion, oldTipoVinculacion: TipoVinculacion, res: Response): Promise<any> {
        try {
            const countNew = await this.contarTipoVinculacion(newTipoVinculacion.nombre);
        
            if (countNew != 0) {
                return res.status(409).json({ error: "El tipo vinculacion ya existe", newTipoVinculacion });
            }
        
            const countOld = await this.contarTipoVinculacion(oldTipoVinculacion.nombre);
        
            if(countOld === 0) {
                return res.status(404).json({ error: "El tipo vinculacion no existe", oldTipoVinculacion });
            }
        
            const { data , error } = await supabase
                .from("tipovinculaciones")
                .update({ nombre: newTipoVinculacion.nombre})
                .eq("nombre", oldTipoVinculacion.nombre);
        
            if (error) {
                console.log("Error al actualizar tipo de vinculacion", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Tipo vinculacion actualizado correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado en actualizar Tipo vinculacion:", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async eliminarTipoVinculacion(nombre: String, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("tipovinculaciones")
                .delete()
                .eq("nombre", nombre);
        
            if (error) {
                console.error("Error al eliminar el tipo vinculacion:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Tipo vinculacion eliminada correctamente",
                data
            });
        } catch (error) {
            console.log("Error inesperado al eliminar tipo vinculacion", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    private static async contarTipoVinculacion(nombre: String): Promise<number> {
        const { count , error } = await supabase
            .from("tipovinculaciones")
            .select("*", { count: "exact", head: true })
            .eq("nombre", nombre);
    
        if (error) {
            console.error("Error al contar tipo vinculaciones:", error);
            throw new Error("Error al contar tipo vinculaciones");
        }
    
        return count ?? 0;
    }
}

export default ServicioTipoVinculacion;