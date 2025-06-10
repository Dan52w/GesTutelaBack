class Documento {
    private _id: number;
    private _nombre: string;
    private _direccion: string;
    private _derecho: number;
    private _fechaHora: Date;
    private _accionado: string;

    constructor (id: number, nombre: string, direccion: string, derecho: number, fechaHora: Date, accionado: string) {
        this._id = id;
        this._nombre = nombre;
        this._direccion = direccion;
        this._derecho = derecho;
        this._fechaHora = fechaHora;
        this._accionado = accionado;
    }

    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }
    get nombre(): string {
        return this._nombre;
    }
    set nombre(value: string) {
        this._nombre = value;
    }
    get direccion(): string {
        return this._direccion;
    }
    set direccion(value: string) {
        this._direccion;
    }
    get derecho(): number {
        return this._derecho;
    }
    set derecho(value: number) {
        this._derecho = value;
    }
    get fechaHora(): Date {
        return this._fechaHora;
    }
    set fechaHora(value: Date) {
        this._fechaHora = value;
    }
    get accionado(): string {
        return this._accionado;
    }
    set accionado(value: string) {
        this._accionado = value;
    }
}

export default Documento;