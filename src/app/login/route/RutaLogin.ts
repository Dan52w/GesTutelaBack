import { Router } from "express";
import controladorLogin from "../controller/ControladorLogin";

class RutaLogin {
    public rutaLoginApi: Router;

    constructor () {
        this.rutaLoginApi = Router();

        this.rutaLoginApi.post("/login", controladorLogin.llamarLogin);
        this.rutaLoginApi.post("/register", controladorLogin.llamarCrearLogin);
    }
}

const rutaLogin = new RutaLogin();
export default rutaLogin.rutaLoginApi;