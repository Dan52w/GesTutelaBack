class Usuario {
    private _id: number;
    private _nombre: string;
    private _apellido: string;
    private _cedula: number;
    private _rol: number;
    private _fechaNacimiento: Date;
    private _telefono: string;

    constructor (id: number, nombre: string, apellido: string, cedula: number, rol: number, fechaNacimiento: Date, telefono: string) {
        this._id = id;
        this._nombre = nombre;
        this._apellido = apellido;
        this._cedula = cedula;
        this._rol = rol;
        this._fechaNacimiento = fechaNacimiento;
        this._telefono = telefono;
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
    get apellido(): string {
        return this._apellido;
    }
    set apellido(value: string) {
        this._apellido = value;
    }
    get cedula(): number {
        return this._cedula;
    }
    set cedula(value: number) {
        this._cedula = value;
    }
    get rol(): number {
        return this._rol;
    }
    set rol(value: number) {
        this._rol = value;
    }
    get fechaNacimiento(): Date {
        return this._fechaNacimiento;
    }
    set fechaNacimiento(value: Date) {
        this._fechaNacimiento = value;
    }
    get telefono(): string {
        return this._telefono;
    }
    set telefono(value: string) {
        this._telefono = value;
    }
}

export default Usuario;