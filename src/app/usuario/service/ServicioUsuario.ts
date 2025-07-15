import { response, Response } from "express";
import supabase from "../../../config/connection/supabaseClient";
import { count } from "console";
import Usuario from "../model/Usuario";

class ServicioUsuario {
    protected static async ObtenerTodos(res: Response): Promise<any> {
        try {
            const { data , count , error } = await supabase
                .from("usuarios")
                .select(`*, rol:rol ( nombre )`, { count: "exact" })
                .order("apellido", {ascending: true});
        
            if (error) {
                console.log("Error al obtener todos los Usuarios", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Usuarios obtenidos correctamente",
                cantidad: count,
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener todos los Usuarios", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async obtenerPorId(id: number, res: Response): Promise<any> {
        try {
            const { data , count , error } = await supabase
                .from("usuarios")
                .select(`*, rol:rol ( nombre )`, { count: "exact" })
                .eq("id", id)
            
            if (error) {
                console.error("Error al obtener el Usuario:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
        
            return res.status(200).json({
                message: "Usuario obtenido correctamente",
                cantidad: count,
                data
            })
        } catch(error) {
            console.log("Error inesperado en obtener Usuario por ID:", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async obtenerPorNombre(nombre: string, res: Response): Promise<any> {
        try {
            const { data , count , error } = await supabase
                .from("usuarios")
                .select(`*, rol:rol ( nombre )`, { count: "exact" })
                .eq("nombre", nombre)
                .order("apellido", {ascending: true})
            
            if (error) {
                console.error("Error al obtener el Usuario:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
        
            return res.status(200).json({
                message: "Usuario obtenido correctamente",
                cantidad: count,
                data
            })
        } catch(error) {
            console.log("Error inesperado en obtener Usuario por nombre:", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async obtenerPorApellido(apellido: string, res: Response): Promise<any> {
        try {
            const { data , count , error } = await supabase
                .from("usuarios")
                .select(`*, rol:rol ( nombre )`, { count: "exact" })
                .eq("apellido", apellido)
                .order("apellido", {ascending: true})
            
            if (error) {
                console.error("Error al obtener el Usuario:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
        
            return res.status(200).json({
                message: "Usuario obtenido correctamente",
                cantidad: count,
                data
            })
        } catch(error) {
            console.log("Error inesperado en obtener Usuario por apellido:", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async obtenerPorCedula(cedula: number, res: Response): Promise<any> {
        try {
            const { data , count , error } = await supabase
                .from("usuarios")
                .select(`*, rol:rol ( nombre )`, { count: "exact" })
                .eq("cedula", cedula)
                .order("apellido", {ascending: true})
            
            if (error) {
                console.error("Error al obtener el Usuario:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
        
            return res.status(200).json({
                message: "Usuario obtenido correctamente",
                cantidad: count,
                data
            })
        } catch(error) {
            console.log("Error inesperado en obtener Usuario por cedula:", error);
            return res.status(500).json({error: "Error inesperado del servidor"});
        }
    }

    protected static async obtenerPorRol(rol: string, res: Response): Promise<any> {
        try {
            const { data: rolData, error: rolError } = await supabase
                .from("roles")
                .select("id")
                .eq("nombre", rol)
                .single();
        
            if (rolError || !rolData) {
                return res.status(404).json({ error: "rol no encontrado" });
            }
        
            const idRol = rolData.id;
        
            const { data, error, count } = await supabase
                .from("usuarios")
                .select(`*, rol:rol (nombre)`, { count: "exact" })
                .eq("rol", idRol);
        
            if (error) {
                console.error("Error al obtener el Usuario:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
        
            return res.status(200).json({
                message: "Usuario(s) obtenido(s) correctamente",
                cantidad: count,
                data
            });
        } catch (error) {
            console.error("Error inesperado en obtener Usuario por Rol:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async crearUsuario(usuario: Usuario, rol: string, res: Response): Promise<any> {
        try {
            const count = await this.contarUsuario(usuario.cedula);
            
            const { data: rolData , error: rolError } = await supabase
                .from("roles")
                .select("id")
                .eq("nombre", rol)
                .single();
        
            if (rolError || !rolData) {
                return res.status(404).json({ error: "rol no encontrado" });
            }
            
            const rolId = Number(rolData.id);
            if (count != 0) {
                return res.status(409).json({error: "El usuario ya existe"});
            }
        
            const { data , error} = await supabase
                .from("usuarios")
                .insert([{
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                cedula: usuario.cedula,
                fechanacimiento: usuario.fechaNacimiento,
                rol: rolId,
                telefono: usuario.telefono}])
                .select();
        
            if (error) {
                console.error("Error al crear el usuario:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "usuario creado correctamente",
                data
            });
        } catch (error) {
            console.error("Error inesperado en crear usuario:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async actualizarUsuario(newUsuario: Usuario, rol: string, res: Response) {
        try {
            const countOld = await this.contarUsuario(newUsuario.cedula);
        
            const { data: rolData , error: rolError } = await supabase
                .from("roles")
                .select("id")
                .eq("nombre", rol)
                .single();
        
            if (rolError || !rolData) {
                return res.status(404).json({ error: "rol no encontrado" });
            }
            
            const rolId = Number(rolData.id);
        
            if (countOld === 0) {
                return res.status(404).json({ error: "El Usuario no encontrado", newUsuario });
            }
        
            const { data , error } = await supabase
                .from("usuarios")
                .update([{nombre: newUsuario.nombre,
                    apellido: newUsuario.apellido,
                    telefono: newUsuario.telefono,
                    fechanacimiento: newUsuario.fechaNacimiento,
                    rol: rolId}])
                .eq("cedula", newUsuario.cedula);
        
            if (error) {
                console.error("Error al actualizar el Usuario:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Usuario actalizado correctamente",
                Usuario: "Nombre: " + newUsuario.nombre + " Apellido: " + newUsuario.apellido + " Telefono: " + newUsuario.telefono,
                data
            });
        } catch (error) {
            console.error("Error inesperado en actualizar Usuario:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async eliminarUsuario(cedula: number, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("usuarios")
                .delete()
                .eq("cedula", cedula)
        
            if (error) {
                console.error("Error al actualizar el Usuario:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Usuario eliminado correctamente",
            })
        } catch (error) {
            console.error("Error inesperado al eliminar Usuario:", error);
            return res.status(500).json({ error: "Error inesperado del servidor"});
        }
    }

    private static async contarUsuario(cedula: number): Promise<number> {
        const { count , error } = await supabase
            .from("usuarios")
            .select("*", {count: "exact", head: true})
            .eq("cedula", cedula);
    
        if (error || count === null) {
            console.error("Error al contar usuarios:", error);
            throw new Error("Error al contar usuarios");
        }

        return count ?? 0;
    }
}

export default ServicioUsuario;