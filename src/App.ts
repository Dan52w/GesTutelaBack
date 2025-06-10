import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import rutaRolApi from './app/rol/route/RutaRol';
import rutaEstadoApi from './app/estado/route/RutaEstado';
import rutaTipoVinculacionApi from './app/tipo-vinculacion/route/RutaTipoVinculacion';
import rutaDerechoApi from './app/derecho/route/RutaDerecho';
import rutaResultadoApi from './app/resultado/route/RutaResultado';
import rutaDocumentoApi from './app/documento/route/RutaDocumento';
import rutaUsuarioApi from './app/usuario/route/RutaUsuario';
import rutaAsignacionApi from './app/asignacion/route/RutaAsignacion';
import rutaRegistroCambioApi from './app/registro-cambio/route/RutaRegistroCambio';
import rutaVincilacionApi from './app/vinculacion/route/RutaVinculcion';
import rutaLoginApi from './app/login/route/RutaLogin';

class App {
    public app: express.Application;
    
    constructor() {
        this.app = express();

        this.app.set("PORT", 3123); //Solo un set para el puerto
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({limit: '100Mb'}));
        this.app.use(express.urlencoded({extended: true}));

        this.app.use("/api/v1/rol", rutaRolApi);
        this.app.use("/api/v1/estado", rutaEstadoApi);
        this.app.use("/api/v1/tipovinculacion", rutaTipoVinculacionApi);
        this.app.use("/api/v1/derecho", rutaDerechoApi);
        this.app.use("/api/v1/resultado", rutaResultadoApi);
        this.app.use("/api/v1/documento", rutaDocumentoApi);
        this.app.use("/api/v1/usuario", rutaUsuarioApi);
        this.app.use("/api/v1/asignacion", rutaAsignacionApi);
        this.app.use("/api/v1/registrocambio", rutaRegistroCambioApi);
        this.app.use("/api/v1/vinculacion", rutaVincilacionApi);

        this.app.use("/api/v1/", rutaLoginApi);
    }  

    public start() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Listo el backend en el puerto: ", this.app.get("PORT"));
        });
    }
}

export default App;