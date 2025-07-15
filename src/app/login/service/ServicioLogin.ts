import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import supabase from "../../../config/connection/supabaseClient";
import { Request, Response } from "express";
import Login from "../model/Login";

dotenv.config({ path: 'variables.env' });
const secret = process.env.SECRET_KEY as string;
class ServicioLogin {
    protected static async login(login: Login, res: Response){
        try {
            console.log(login)
            const { data: loginR, error } = await supabase
                .from("login")
                .select(`*, usuario:codusuario(id, nombre, cedula, rol(*))`)
                .eq("correo", login.correo)
                .limit(1);

            if (error || !loginR || loginR.length === 0) {
                return res.status(404).json({ error: "Correo no encontrado" });
            }

            const usuario = loginR[0];

            const contraseñaValida = await bcrypt.compare(login.contrasnia, usuario.contraseña);
            if (!contraseñaValida) {
                return res.status(401).json({ error: "Contraseña incorrecta" });
            }

            const token = jwt.sign(
                { id: usuario.id, correo: usuario.correo },
                process.env.SECRET_KEY as string,
                { expiresIn: "2h" }
            );

            return res.status(200).json({
                message: "Inicio de sesión exitoso",
                token,
                login: {
                    id: usuario.id,
                    correo: usuario.correo,
                },
                usuario: usuario.usuario // <- datos de la tabla usuarios
            });

        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    protected static async crearLogin(login: Login, res: Response): Promise<any> {
        try {
            // 1. Validar campos requeridos
            if (!login.correo || !login.contrasnia || !login.codUsuario) {
                return res.status(400).json({ error: "Faltan campos obligatorios" });
            }

            // 2. Verificar si ya existe el usuario por correo o cédula
            const { data: existente, error: errorBusqueda } = await supabase
            .from("login")
            .select("correo, id")
            .or(`correo.eq.${login.correo} , id.eq.${login.codUsuario}`)
            .limit(1);

            if (errorBusqueda) throw errorBusqueda;

            if (existente && existente.length > 0) {
            return res.status(409).json({ error: "El correo ya existe" });
            }

            // 3. Encriptar la contraseña
            const contraseñaHasheada = await bcrypt.hash(login.contrasnia, 10);

            // 4. Insertar nuevo usuario
            const { data, error } = await supabase
            .from("login")
            .insert([{codusuario: login.codUsuario,
                    correo: login.correo,
                    contraseña: contraseñaHasheada}])
            .select(); // Opcional, para retornar el usuario insertado

            if (error) {
            console.error("Error al registrar usuario:", error);
            return res.status(500).json({ error: "Error al registrar usuario" });
            }

            return res.status(201).json({
            message: "Usuario registrado correctamente",
            usuario: data[0]
            });

        } catch (error) {
            console.error("Error inesperado al registrar usuario:", error);
            return res.status(500).json({ error: "Error inesperado del servidor" });
        }
    }
}

export default ServicioLogin;