import { Response } from "express";
import supabase from "../../../config/connection/supabaseClient";
import Asignacion from "../model/Asignacion";;

class ServicioAsignacion {
    protected static async ObtenerTodos(res: Response): Promise<any> {
        try {
            const { data, count, error } = await supabase
                .from("asignaciones")
                .select(`id, estudiante:usuarios!idestudiante(nombre, apellido, id, cedula), \
                    profesor:usuarios!idprofesor(nombre, apellido, id, cedula), \
                    fechaasignacion`, { count: "exact" })
                .order("cedula", { referencedTable: "estudiante", ascending: true });
        
            if (error) {
                console.log("Error al obtener todas las Asignaciones", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Asignaciones obtenidas correctamente",
                cantidad: count,
                data
            });
        } catch (error) {
            console.log("Error inesperado al obtener todas las Asignaciones:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    protected static async obtenerPorEstudiante(cedula: number, res: Response): Promise<any> {
        try {
            const { data: usuarioData, error: errorUsuario } = await supabase
                .from("usuarios")
                .select("id")
                .eq("cedula", cedula)
                .single();
        
            if (errorUsuario || !usuarioData) {
                return res.status(404).json({ error: "No se encontró ningún estudiante con esa cédula" });
            }
        
            const idEstudiante = usuarioData.id;
        
            const { data, count, error } = await supabase
                .from("asignaciones")
                .select(`id, 
                    estudiante:usuarios!idestudiante(nombre, apellido, id, cedula), 
                    profesor:usuarios!idprofesor(nombre, apellido, id, cedula), 
                    fechaasignacion`, { count: "exact" })
                .eq("idestudiante", idEstudiante);
        
            if (error) {
                console.log("Error al obtener asignación por estudiante:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "No se encontraron asignaciones para esta cédula" });
            }
        
            return res.status(200).json({
                message: "Asignaciones obtenidas correctamente",
                cantidad: count,
                data
            });
        
        } catch (error) {
            console.log("Error inesperado al obtener asignación por estudiante:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async obtenerPorEstudianteId(id: number, res: Response): Promise<any> {
        try {
            const { data: usuarioData, error: errorUsuario } = await supabase
                .from("usuarios")
                .select("id")
                .eq("id", id)
                .single();
        
            if (errorUsuario || !usuarioData) {
                return res.status(404).json({ error: "No se encontró ningún estudiante con esa id" });
            }
        
            const idEstudiante = usuarioData.id;
        
            const { data, count, error } = await supabase
                .from("asignaciones")
                .select(`id, 
                    estudiante:usuarios!idestudiante(nombre, apellido, id, cedula), 
                    profesor:usuarios!idprofesor(nombre, apellido, id, cedula), 
                    fechaasignacion`, { count: "exact" })
                .eq("idestudiante", idEstudiante);
        
            if (error) {
                console.log("Error al obtener asignación por estudiante:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "No se encontraron asignaciones para esta id" });
            }
        
            return res.status(200).json({
                message: "Asignaciones obtenidas correctamente",
                cantidad: count,
                data
            });
        
        } catch (error) {
            console.log("Error inesperado al obtener asignación por estudiante:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async obtenerPorProfesor(cedula: number, res: Response): Promise<any> {
        try {
            const { data: usuarioData, error: errorUsuario } = await supabase
                .from("usuarios")
                .select("id")
                .eq("cedula", cedula)
                .single();
        
            if (errorUsuario || !usuarioData) {
                return res.status(404).json({ error: "No se encontró ningún profesor con esa cédula" });
            }
        
            const idProfesor = usuarioData.id;
        
            const { data, count, error } = await supabase
                .from("asignaciones")
                .select(`id, 
                    estudiante:usuarios!idestudiante(nombre, apellido, id, cedula), 
                    profesor:usuarios!idprofesor(nombre, apellido, id, cedula), 
                    fechaasignacion`, { count: "exact" })
                .eq("idprofesor", idProfesor);
        
            if (error) {
                console.log("Error al obtener asignación por profesor:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "No se encontraron asignaciones para esta cédula" });
            }
        
            return res.status(200).json({
                message: "Asignaciones obtenidas correctamente",
                cantidad: count,
                data
            });
        
        } catch (error) {
            console.log("Error inesperado al obtener asignación por profesor:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async obtenerEntreFechas(fechaIni: string, fechaFin: string, res: Response): Promise<any> {
        try {
            const { data , count , error } = await supabase
                .from("asignaciones")
                .select(`id, 
                    estudiante:usuarios!idestudiante(nombre, apellido, id, cedula), \
                    profesor:usuarios!idprofesor(nombre, apellido, id, cedula), \
                    fechaasignacion`, { count: "exact" })
                .gte("fechaasignacion", fechaIni)
                .lte("fechaasignacion", fechaFin);
        
            if (error) {
                console.log("Error al obtener asignación por fechas:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            if (!data || data.length === 0) {
                return res.status(404).json({ error: "No se encontraron asignaciones para estas fechas" });
            }
        
            return res.status(200).json({
                message: "Asignaciones obtenidas correctamente",
                cantidad: count,
                data
            });
        } catch (error) {
            console.log("Error inesperado al obtener asignación entre fechas:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    protected static async crearAsignacion(asignacion: Asignacion, res: Response): Promise<any> {
        try {
            // Verificar que el estudiante tiene rol de estudiante
            const { data: estudianteData, error: errorEstudiante } = await supabase
                .from("usuarios")
                .select("rol, id")
                .eq("cedula", asignacion.codEstudiante)
                .single();
        
            if (errorEstudiante || !estudianteData || estudianteData.rol !== 2) {
                return res.status(400).json({ error: "El ID del estudiante no es válido o no tiene rol de estudiante" });
            }
        
            const idEstudiante = estudianteData.id;
        
            // Verificar que el profesor tiene rol de profesor
            const { data: profesorData, error: errorProfesor } = await supabase
                .from("usuarios")
                .select("rol, id")
                .eq("cedula", asignacion.codProfesor)
                .single();
        
            if (errorProfesor || !profesorData || profesorData.rol !== 1 || profesorData.rol !== 3) {
                return res.status(400).json({ error: "El ID del profesor no es válido o no tiene rol de profesor" });
            }
        
            const idProfesor = profesorData.id;
        
            // Verificar que no exista la asignación
            const count = await this.contarAsignacion(idEstudiante, idProfesor);
        
            if (count != 0) {
                return res.status(409).json({ error: "El estudiante ya tiene una asignación con el docente" });
            }
        
            // Insertar asignación
            const { data, error } = await supabase
                .from("asignaciones")
                .insert([{
                    idestudiante: idEstudiante,
                    idprofesor: idProfesor,
                    fechaasignacion: asignacion.fechaAsignacion
                }]);
        
            if (error) {
                console.error("Error al crear la Asignación:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Asignación creada correctamente",
                data
            });
        } catch (error) {
            console.error("Error inesperado al crear asignación:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }

    protected static async actualizarAsignacion(asignacion: Asignacion, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("asignaciones")
                .update([{fechaasignacion: asignacion.fechaAsignacion}])
                .eq("idestudiante", asignacion.codEstudiante)
                .eq("idprofesor", asignacion.codProfesor);
        
            if (error) {
                console.log("Error al actualizar asignacion:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "Asignacion actualizada correctamente"
            })
        } catch (error) {
            console.log("Error inesperado al actualizar asignacion:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    protected static async eliminarAsignacion(id: number, res: Response): Promise<any> {
        try {
            const { data , error } = await supabase
                .from("asignaciones")
                .delete()
                .eq("id", id);
        
            if (error) {
                console.error("Error al eliminar el asignacion:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        
            return res.status(200).json({
                message: "asignacion eliminado correctamente",
            })
        } catch (error) {
            console.log("Error inesperado al eliminar asignacion:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    private static async contarAsignacion(idestudiante: number, idprofesor: number): Promise<any> {
        const { count, error } = await supabase
            .from("asignaciones")
            .select("*", { count: "exact", head: true }) // 'head: true' evita traer datos, solo cuenta
            .eq("idestudiante", idestudiante)
            .eq("idprofesor", idprofesor);

        if (error) {
            console.error("Error al contar asignaciones:", error);
            throw new Error("Error al contar asignaciones");
        }

        return count;
    }

}

export default ServicioAsignacion;