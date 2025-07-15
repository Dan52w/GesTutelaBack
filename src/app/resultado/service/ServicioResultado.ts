import { Response } from "express";
import supabase from "../../../config/connection/supabaseClient";
import Resultado from "../model/Resultado";

class ServicioResultado {
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("resultados")
                .select("*")
                .order("id", { ascending: true });
        
            if (error) {
                console.log("Error en obtener todos los resultados", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Resultados obtenidos correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado en obtener todos los resultados: ", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async obtenerPorId(id: number, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("resultados")
                .select("*")
                .eq("id", id);
        
            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: "Resultado no encontrado" });
                }
            
                console.error("Error al obtener el Resultado:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Resultados obtenidos correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado en obtener resultado por ID: ", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async obtenerPorNombre(nombre: string, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("resultados")
                .select("*")
                .eq("nombre", nombre);
        
            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: "Resultado no encontrado" });
                }
            
                console.error("Error al obtener el Resultado:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Resultados obtenidos correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado en obtener resultado por nombre: ", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async crearResultado(nombre: string, res: Response): Promise<any> {
        try {
            const count = await this.contarResultado(nombre);
        
            if (count != 0) {
                return res.status(409).json({error: "El resultado ya existe"})
            }
        
            const { data , error } = await supabase
                .from("resultados")
                .insert([{nombre}]);
        
            if (error) {
                console.log("Error en crear resultado", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Resultado creado correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado en crear resultado: ", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async actualizarResultado(oldResultado: Resultado, newResultado: Resultado, res: Response): Promise<any> {
        try {
            const countNew = await this.contarResultado(newResultado.nombre);
        
            if (countNew != 0) {
                return res.status(409).json({error: "El resultado ya existe", newResultado});
            }
        
            const countOld = await this.contarResultado(oldResultado.nombre);
        
            if (countOld == 0) {
                return res.status(404).json({error: "El resultado no existe", oldResultado})
            }
            const { data , error } = await supabase
                .from("resultados")
                .update({ nombre: newResultado.nombre})
                .eq("nombre", oldResultado.nombre);
        
            if (error) {
                console.log("Error en actualizar resultado", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Resultados actualizado correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado en actualizar resultado: ", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async elimanarResultado(nombre: string, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("resultados")
                .delete()
                .eq("nombre", nombre);
        
            if (error) {
                console.log("Error en eliminado resultado", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Resultados eliminado correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado en actualizar resultado: ", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    private static async contarResultado(nombre: string): Promise<number> {
        const { count , error} = await supabase
            .from("resultados")
            .select("*", { count: "exact", head: true})
            .eq("nombre", nombre);
    
        if (error) {
            console.log("Error al contar Resultados", error);
            throw new Error("Error al contar Resultados");
        }
    
        return count ?? 0;
    }
}

export default ServicioResultado;