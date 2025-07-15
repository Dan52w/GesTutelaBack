import { Response } from "express";
import supabase from "../../../config/connection/supabaseClient";
import { count } from "console";
import Estado from "../model/Estado";

class ServicioEstado {
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const {data, error} = await supabase
                .from("estados")
                .select("*")
                .order("id", {ascending: true});
        
            if (error) {
                console.log("Error en obtener todos los Estados", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Estados obtenidos correctamente",
                data
            });
        } catch(error) {
            console.log("Error inesperado en obtener todos los Estados", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    protected static async obtenerPorId(id: Number, res: Response): Promise<any> {
        try {
            const {data, error} = await supabase
                .from("estados")
                .select("*")
                .eq("id", id)
                .single();
        
            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: "Estado no encontrado" });
                }
            
                console.error("Error al obtener el estado:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Estado obtenido correctamente",
                data
            })
        } catch(error) {
            console.log("Error inesperado en obtener Estado por ID:", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async obtenerPorNombre(nombre: string, res: Response): Promise<any> {
        try {
            const {data, error} = await supabase
                .from("estados")
                .select("*")
                .eq("nombre", nombre)
        
            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: "Estado no encontrado" });
                }
        
                console.error("Error al obtener el estado:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Estado obtenido correctamente",
                data
            })
        } catch(error) {
            console.log("Error inesperado en obtener estado por Nombre:", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async crearEstado(nombre: string, res: Response): Promise<any> {
        try {
            const count = await this.contarEstado(nombre);
        
            if(count != 0) {
                return res.status(409).json({ error: "El estado  ya existe"});
            }
        
            const {data, error} = await supabase
                .from("estados")
                .insert([{nombre}]);
        
            if (error) {
                console.error("Error al crear el estado:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Estado creado correctamente",
                Estado: nombre
            })
        } catch(error) {
            console.log("Error inesperado al crear un nuevo Estado", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async actualizarEstado(newEstado: Estado, oldEstado: Estado, res: Response): Promise<any> {
        try {
            const countNew = await this.contarEstado(newEstado.nombre);
        
            if (countNew != 0) {
                return res.status(409).json({ error: "El estado  ya existe", newEstado});
            }
        
            const countOld = await this.contarEstado(oldEstado.nombre);
        
            if (countOld === 0) {
                return res.status(404).json({ error: "El estado no existe", oldEstado });
            }
        
            const {data , error} = await supabase
                .from("estados")
                .update({nombre : newEstado.nombre})
                .eq("nombre", oldEstado.nombre);
        
            if (error) {
                console.log("Error al actualizar estado", error);
                res.status(500).json({error: "Error inesperado del servidor"});
            }
        
            return res.status(200).json({
                message: "Estado actualizado correctamente",
                data: newEstado.nombre
            })
        } catch(error) {
            console.log("Error inesperado al actualizar estado", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async eliminarEstado(nombre: string, res: Response): Promise<any> {
        try {
            const {data , error} = await supabase
                .from("estados")
                .delete()
                .eq("nombre", nombre);
        
            if (error) {
                console.log("Error al eliminar estado", error);
                res.status(500).json({error: "Error inesperado del servidor"});
            }

            return res.status(200).json({
                message: "Estado eliminado correctamente",
                data
            })
        } catch(error) {
            console.log("Error inesperado al eliminar estado", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    private static async contarEstado(nombre: string): Promise<number> {
        const {count , error} = await supabase
            .from("estados")
            .select("*", {count: "exact", head: true})
            .eq("nombre", nombre)
    
        if (error) {
            console.error("Error al contar estados:", error);
            throw new Error("Error al contar estados");
        }
    
        return count ?? 0;
    }
}

export default ServicioEstado;