class Vinculacion {
    private _codDocumento: number;
    private _codUsuario: number;
    private _vinculacion: number;

    constructor(codDocumento: number, codUsuario: number, vinculacion: number) {
        this._codDocumento = codDocumento;
        this._codUsuario = codUsuario;
        this._vinculacion = vinculacion;
    }

    get codDocumento(): number {
        return this._codDocumento;
    }

    get codUsuario(): number {
        return this._codUsuario;
    }

    get vinculacion(): number {
        return this._vinculacion;
    }

    set codDocumento(value: number) {
        this._codDocumento = value;
    }

    set codUsuario(value: number) {
        this._codUsuario = value;
    }

    set vinculacion(value: number) {
        this._vinculacion = value;
    }
}

export default Vinculacion;