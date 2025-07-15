import { Response } from "express";
import supabase from "../../../config/connection/supabaseClient";
import Derecho from "../model/Derecho";

class ServicioDerecho {
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("derechos")
                .select("*")
                .order("id", {ascending: true});
        
            if (error) {
                console.log("Error al obtener todos los derechos", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Derechos obtenidos correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener todos los derechos", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async obtenerPorId(id: number, res:Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("derechos")
                .select("*")
                .eq("id", id);
        
            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: "Estado no encontrado" });
                }
            
                console.error("Error al obtener el estado:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Derecho obtenido correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener derecho por ID", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async obtenerPorNombre(nombre: string, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("derechos")
                .select("*")
                .eq("nombre", nombre);
        
            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: "Estado no encontrado" });
                }
            
                console.error("Error al obtener el estado:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Derecho obtenido correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener derecho por Nombre", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async crearDerecho(nombre: string, res: Response): Promise<any> {
        try {
            const count = await this.contarDerecho(nombre);
        
            if (count != 0) {
                return res.status(409).json({error: "El derecho ya existe"});
            }
        
            const { data , error } = await supabase
                .from("derechos")
                .insert([{nombre}]);
        
            if (error) {
                console.log("Error al crear Derecho", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Derecho creado correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado al crear Derecho", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async actualizarDerecho(newDerecho: Derecho, oldDerecho: Derecho, res: Response): Promise<any> {
        try {
            const countNew = await this.contarDerecho(newDerecho.nombre);
        
            if (countNew != 0) {
                res.status(409).json({error: "El derecho ya existe", newDerecho})
            }
        
            const countOld = await this.contarDerecho(oldDerecho.nombre);
        
            if (countOld === 0) {
                res.status(404).json({error: "El derecho no existe", oldDerecho});
            } 
        
            const { data , error } = await supabase
                .from("derechos")
                .update({nombre : newDerecho.nombre})
                .eq("nombre", oldDerecho.nombre);
        
            if (error) {
                console.log("Error al actualizar derecho", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Derecho actualizado correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado al actualizar derecho", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async eliminarDerecho(nombre: string, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("derechos")
                .delete()
                .eq("nombre", nombre);
        
            if (error) {
                console.log("Error al obtener derecho por Nombre", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Derecho obtenido correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener derecho por Nombre", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    private static async contarDerecho(nombre: string): Promise<number> {
        const { count , error } = await supabase
            .from("derechos")
            .select("*", { count: "exact", head: true})
            .eq("nombre", nombre)
    
        if (error) {
            console.log("Error al contar Derechos", error);
            throw new Error("Error al contar Derechos");
        }
    
        return count ?? 0;
    }
}

export default ServicioDerecho;