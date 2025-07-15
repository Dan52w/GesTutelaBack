import { Response } from "express";
import supabase from "../../../config/connection/supabaseClient";
import Rol from "../model/Rol";

class ServicioRol {
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const { data, error } = await supabase
                .from("roles")
                .select("*")
                .order("id", { ascending: true });
        
            if (error) {
                console.error("Error al obtener todos los roles:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Roles obtenidos correctamente",
                data
            });
        } catch (error) {
            console.error("Error en obtener todos los Roles:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    protected static async obtenerPorId(id: number, res: Response): Promise<any> {
        try {
            const { data, error } = await supabase
                .from("roles")
                .select("*")
                .eq("id", id)
                .single(); // asume que solo hay un rol con ese id
        
            if (error) {
                if (error.code === 'PGRST116') { // not found
                    return res.status(404).json({ error: "Rol no encontrado" });
                }
        
                console.error("Error al obtener el rol:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Rol obtenido correctamente",
                data
            });
        
        } catch (error) {
            console.error("Error inesperado en obtener Rol por ID:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }
    
    protected static async obtenerPorNombre(nombre: string, res: Response): Promise<any> {
        try {
            const { data, error } = await supabase
                .from("roles")
                .select("*")
                .eq("nombre", nombre)
        
            if (error) {
                if (error.code === 'PGRST116') { // not found
                    return res.status(404).json({ error: "Rol no encontrado" });
                }
        
                console.error("Error al obtener el rol:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Rol obtenido correctamente",
                data
            });
        
        } catch (error) {
            console.error("Error inesperado en obtener Rol por nombre:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async crearRol(nombre: string, res: Response): Promise<any> {
        try {
            const count = await this.contarRol(nombre);
        
            if (count != 0) {
                return res.status(409).json({ error: "El rol ya existe" });
            }
        
            const { data, error } = await supabase
                .from("roles")
                .insert([{ nombre }]);
        
            if (error) {
                console.error("Error al crear el rol:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(201).json({
                message: "Rol creado correctamente",
                Rol: nombre
            });
        
        } catch (error) {
            console.error("Error inesperado en crearRol:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async actualizarRol(newRol: Rol, oldRol: Rol, res: Response): Promise<any> {
        try {
            const countNew = await this.contarRol(newRol.nombre);
        
            if(countNew != 0) {
                return res.status(409).json({ error: "El rol ya existe", newRol });
            }
        
            const countOld = await this.contarRol(oldRol.nombre);
        
            if(countOld === 0) {
                return res.status(404).json({ error: "El rol no existe", oldRol });
            }
        
            const { data, error } = await supabase
                .from("roles")
                .update({ nombre: newRol.nombre })
                .eq("nombre", oldRol.nombre);
            
            if (error) {
                console.error("Error al actualizar el rol:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Rol actualizado correctamente",
                data
            });
        
        } catch (error) {
            console.error("Error inesperado en actualizar Rol:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async eliminarRol(id: number, res: Response): Promise<any> {
        try {
            const { data, error } = await supabase
                .from("roles")
                .delete()
                .eq("id", id);
        
            if (error) {
                console.error("Error al eliminar el rol:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Rol eliminado correctamente",
                data
            });
        
        } catch (error) {
            console.error("Error inesperado en eliminarRol:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    private static async contarRol(nombre: string): Promise<number> {
        const { count, error } = await supabase
            .from("roles")
            .select("*", { count: "exact", head: true })
            .eq("nombre", nombre);
    
        if (error) {
            console.error("Error al contar roles:", error);
            throw new Error("Error al contar roles");
        }
        return count ?? 0;
    }
    
}

export default ServicioRol;