import { Request, Response } from "express";
import ServicioLogin from "../service/ServicioLogin";
import Login from "../model/Login";

class ControladorLogin extends ServicioLogin {
    public llamarLogin(req: Request, res: Response) {
        const login = new Login(0,0,req.body.email,req.body.password);
        ServicioLogin.login(login, res);
    }

    public llamarCrearLogin(req: Request, res: Response) {
        const login = new Login(0, req.body.codUsuario, req.body.email, req.body.password);
        ServicioLogin.crearLogin(login, res);
    }
}

const controladorLogin = new ControladorLogin();
export default controladorLogin;