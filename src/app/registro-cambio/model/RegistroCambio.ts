class RegistroCambio {
    private _id: number;
    private _codDocumento: number;
    private _codEstado: number;
    private _codResultado: number;
    private _observacion: string;
    private _fechaCambio: Date;

    constructor(id: number,codDocumento: number, codEstado: number, codResultado: number, observacion: string, fechaCambio: Date) {
        this._id = id;
        this._codDocumento = codDocumento;
        this._codEstado = codEstado;
        this._codResultado = codResultado;
        this._observacion = observacion;
        this._fechaCambio = fechaCambio;
    }

    get id(): number {
        return this._id;
    }

    get codDocumento(): number {
        return this._codDocumento;
    }

    get codEstado(): number {
        return this._codEstado;
    }

    get codResultado(): number {
        return this._codResultado;
    }

    get observacion(): string {
        return this._observacion;
    }

    get fechaCambio(): Date {
        return this._fechaCambio;
    }

    set id(value: number) {
        this._id = value;
    }

    set codDocumento(value: number) {
        this._codDocumento = value;
    }

    set codEstado(value: number) {
        this._codEstado = value;
    }

    set codResultado(value: number) {
        this._codResultado = value;
    }

    set observacion(value: string) {
        this._observacion = value;
    }

    set fechaCambio(value: Date) {
        this._fechaCambio = value;
    }
}

export default RegistroCambio;
