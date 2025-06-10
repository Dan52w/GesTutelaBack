class Login {
    private _id: number;
    private _codUsuario: number;
    private _correo: string;
    private _contrasnia: string;

    constructor(id: number, codUsuario: number, correo: string, contrasnia: string) {
        this._id = id;
        this._codUsuario = codUsuario;
        this._correo = correo;
        this._contrasnia = contrasnia;
    }

    // Getters
    get id(): number {
        return this._id;
    }

    get codUsuario(): number {
        return this._codUsuario;
    }

    get correo(): string {
        return this._correo;
    }

    get contrasnia(): string {
        return this._contrasnia;
    }

    // Setters
    set id(value: number) {
        this._id = value;
    }

    set codUsuario(value: number) {
        this._codUsuario = value;
    }

    set correo(value: string) {
        this._correo = value;
    }

    set contrasnia(value: string) {
        this._contrasnia = value;
    }
}

export default Login;