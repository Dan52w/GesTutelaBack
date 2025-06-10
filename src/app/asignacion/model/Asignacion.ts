class Asignacion {
    private _id: number;
    private _codEstudiante: number;
    private _codProfesor: number;
    private _fechaAsignacion: Date;

    constructor (id: number, codEstudiante: number, codProfesor: number, fechaAsignacion: Date) {
        this._id = id;
        this._codEstudiante = codEstudiante;
        this._codProfesor = codProfesor;
        this._fechaAsignacion = fechaAsignacion;
    }

    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }
    get codEstudiante(): number{
        return this._codEstudiante;
    }
    set codEstudiante(value: number) {
        this._codEstudiante = value;
    }
    get codProfesor(): number {
        return this._codProfesor;
    }
    set codProfesor(value: number) {
        this._codProfesor = value;
    }
    get fechaAsignacion(): Date {
        return this._fechaAsignacion;
    }
    set fechaAsignacion(value: Date) {
        this._fechaAsignacion = value;
    }
}

export default Asignacion;