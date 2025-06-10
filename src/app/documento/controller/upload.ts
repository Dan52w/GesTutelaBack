import multer from "multer";
import path from "path";

const formatearFecha = (fecha: Date): string => {
    // Formatear fecha como "dd-mm-yyyy"
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // +1 porque los meses van de 0 a 11
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;

    // Formatear hora como "hh:mm:ss"
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    const horaFormateada = `${horas}:${minutos}:${segundos}`;

    const fechaYHora = `${fechaFormateada} ${horaFormateada}`;
    return fechaYHora;
};

// Configurar multer
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "./src/external_files/pdf");
    },
    filename: (_req, file, cb) => {
        const extension = path.extname(file.originalname);
        let nombreBase = path.basename(file.originalname, extension);

        // Reemplazar espacios por guiones
        nombreBase = nombreBase.replace(/\s+/g, "-");

const fechaISO = new Date().toISOString(); // "2025-05-12T05:15:05.000Z"
const fechaFormateada = fechaISO.replace(/[:.]/g, "-"); // "2025-05-12T05-15-05-000Z"


        const nombreFinal = `${nombreBase}-${fechaFormateada}${extension}`;
        cb(null, nombreFinal);
    },
});

const upload = multer({ storage });

export default upload;