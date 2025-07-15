import { Response } from "express";
import supabase from "../../../config/connection/supabaseClient";
import Vinculacion from "../model/Vinculacion";

class ServicioVinculacion {
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("vinculaciones")
                .select(`coddocumento(id, nombre, direccion, codDerecho(*), accionado), \
                    codusuario(nombre, apellido, cedula, rol(*)), \
                    vinculacion(nombre)`);
        
            if (error) {
                console.log("Error en obtener todas las vinculaciones", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Vinculaciones obtenidas correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener todas las vinculaciones", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async obtenerPorIdDoc(idDoc: number, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("vinculaciones")
                .select(`coddocumento(id, nombre, direccion, codDerecho(*), accionado), \
                    codusuario(nombre, apellido, cedula, rol(*)), \
                    vinculacion(nombre)`)
                .eq("coddocumento", idDoc);
        
            if (error) {
                console.error("Error al obtener vinculaciones por ID de documento:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "Vinculaciones no encontradas" });
            }
        
            return res.status(200).json({
                message: "Vinculaciones obtenidas correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener vinculaciones por ID de documento", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async obtenerPorVinculacion(tipVinculacion: string, res: Response): Promise<any> {
        try {
            const { data: vinculacionData , error: vinculacionError} = await supabase
                .from("tipovinculaciones")
                .select("id")
                .eq("nombre", tipVinculacion)
                .single();
        
            if (vinculacionError || !vinculacionData) {
                return res.status(404).json({ error: "Tipo vinculacion no encontrada" });
            }
        
            const idTipVinculacion = vinculacionData.id
        
            const { data, count , error } = await supabase
                .from("vinculaciones")
                .select(`coddocumento(id, nombre, direccion, codDerecho(*), accionado), \
                    codusuario(nombre, apellido, cedula, rol(*)), \
                    vinculacion(nombre)`, {count: "exact"})
                .eq("vinculacion", idTipVinculacion);
        
            if (error || !data) {
                return res.status(404).json({ error: "No se encontraron Vinculaciones para ese tipo de vinculacion" });
            }
        
            return res.status(200).json({
                message: "Vinculacion(es) obtenida(s) correctamente",
                cantidad: count,
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener vinculaciones por tipo", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async obtenerPorUsuarioId(idUsuario: Number, res: Response): Promise<any> {
        try {
            const { data , count , error } = await supabase
                .from("vinculaciones")
                .select(`coddocumento(id, nombre, direccion, codDerecho(*), accionado), \
                    codusuario(nombre, apellido, cedula, rol(*)), \
                    vinculacion(nombre)`, {count: "exact"})
                .eq("codusuario", idUsuario);
        
            if (error) {
                console.error("Error al obtener vinculaciones del usuario:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "vinculaciones del usuario no encontradas" });
            }
        
            return res.status(200).json({
                message: "vinculaciones del usuario obtenido correctamente",
                cantidad: count,
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener vinculaciones del usuario", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async obtenerPorUsuarioCedula(cedula: number, res: Response): Promise<any> {
        try {
            const { data: usuarioData , error: usuarioError } = await supabase
                .from("usuarios")
                .select("id")
                .eq("cedula", cedula)
                .single();
        
            if (usuarioError || !usuarioData) {
                return res.status(404).json({error: "Usuario no encontrado"});
            }
            const idUsuario = usuarioData.id;
        
            const { data , count , error } = await supabase
                .from("vinculaciones")
                .select(`coddocumento(id, nombre, direccion, codDerecho(*), accionado), \
                    codusuario(nombre, apellido, cedula, rol(*)), \
                    vinculacion(nombre)`, {count: "exact"})
                .eq("idusuario", idUsuario);
        
            if (error) {
                console.error("Error al obtener vinculaciones del usuario:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "vinculaciones del usuario no encontradas" });
            }
        
            return res.status(200).json({
                message: "vinculaciones del usuario obtenido correctamente",
                cantidad: count,
                data
            })
        } catch (error) {
            console.log("Error inesperado al obtener vinculaciones del usuario", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async crearVinculacion(vinculacion: Vinculacion, tipVin: string, res: Response): Promise<any> {
        try {
            const { data: tipVinculacionData, error: tipVinculacionError } = await supabase
                .from("tipovinculaciones")
                .select("id")
                .eq("nombre", tipVin)
                .single();
        
            if (tipVinculacionError || !tipVinculacionData) {
                return res.status(404).json({ error: "tipVinculacion no encontrado" });
            }
            
            const idTipVinculacion = tipVinculacionData.id;

            const { data: usuarioData, error: usuarioError } = await supabase
                .from("usuarios")
                .select("id")
                .eq("cedula", vinculacion.codUsuario)
                .single();
        
            if (usuarioError || !usuarioData) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            
            const idUsuario = usuarioData.id;
        
            const { data , error } = await supabase
                .from("vinculaciones")
                .insert([{codusuario: idUsuario,
                    coddocumento: vinculacion.codDocumento,
                    vinculacion: idTipVinculacion}])
                .select();
        
            if (error) {
                console.log("Error al crear Vinculavion", error);
                return res.status(500).json({error: "Error interno del servidor"});
            }
        
            return res.status(200).json({
                message: "Vinculacion creado correctamente",
                data
            })
        } catch (error) {
            console.log("Error inesperado al crear vinculacion", error);
            return res.status(500).json({error: "Error interno del servidor"});
        }
    }

    protected static async obtenerInfoCompletaPorCedula(cedula: number, res: Response): Promise<any> {
        try {
            // 1. Buscar usuario por cédula con su rol
            const { data: usuarioData, error: usuarioError } = await supabase
            .from("usuarios")
            .select("id, rol:rol(nombre), nombre, apellido")
            .eq("cedula", cedula)
            .single();

            if (usuarioError || !usuarioData) {
            return res.status(404).json({ error: "Usuario no encontrado" });
            }

            const idUsuario = usuarioData.id;
            const rol = usuarioData.rol[0]?.nombre;

            // 2. Obtener documentos vinculados al usuario con derecho
            const { data: vinculaciones, error: vinculacionesError } = await supabase
            .from("vinculaciones")
            .select(`
                coddocumento,
                documento:documentos (
                id,
                nombre,
                direccion,
                fechahora,
                derecho:derechos (
                    nombre
                )
                )
            `)
            .eq("codusuario", idUsuario);

            if (vinculacionesError) {
            return res.status(500).json({ error: "Error al obtener vinculaciones" });
            }

            let asignaciones : any[] = [];
            
            // 3. Si es estudiante, buscar profesores asignados
            if (rol === "Estudiante") {
            const { data, error } = await supabase
                .from("asignaciones")
                .select(`
                id,
                fechaasignacion,
                profesor:usuarios!idprofesor (
                    id,
                    nombre,
                    apellido,
                    rol:rol (nombre)
                )
                `)
                .eq("idestudiante", idUsuario);

            if (!error && data) asignaciones = data;
            }

            // 4. Si es profesor, buscar estudiantes asignados
            else if (rol === "Profesor") {
            const { data, error } = await supabase
                .from("asignaciones")
                .select(`
                id,
                fechaasignacion,
                estudiante:usuarios!idestudiante (
                    id,
                    nombre,
                    apellido,
                    rol:rol (nombre)
                )
                `)
                .eq("idprofesor", idUsuario);

            if (!error && data) asignaciones = data;
            }

            return res.status(200).json({
            usuario: usuarioData,
            vinculaciones,
            asignaciones
            });
        } catch (error) {
            console.error("Error inesperado:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

}

export default ServicioVinculacion;