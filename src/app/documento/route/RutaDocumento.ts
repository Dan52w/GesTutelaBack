import { Router } from "express";
import controladorDocumento from "../controller/ControladorDocumento";
import upload from "../controller/upload";

class RutaDocumento {
    public rutaDocumentoApi: Router;

    constructor() {
        this.rutaDocumentoApi = Router();
    
        this.rutaDocumentoApi.get("/download/:id", controladorDocumento.descargarDocumento);
        this.rutaDocumentoApi.post("/upload", upload.single("file"),controladorDocumento.crearDocumento);
        this.rutaDocumentoApi.get("/getall", controladorDocumento.llamarObtenerTodos);
        this.rutaDocumentoApi.get("/getid/:id", controladorDocumento.llamarObtenerPorId);
        this.rutaDocumentoApi.get("/getlaw/:derecho", controladorDocumento.llamarObtenerPorDerecho);
        this.rutaDocumentoApi.get("/getname/:nombre", controladorDocumento.llamarObtenerPorNombre);
        this.rutaDocumentoApi.get("/get/betweenDate", controladorDocumento.llamarObtenerEntreFechas);
    }
}

const rutaDocumento = new RutaDocumento();
export default rutaDocumento.rutaDocumentoApi;