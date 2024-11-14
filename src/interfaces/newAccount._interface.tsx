import { StatusUser } from "../enum/enum"

export interface INewAccount{
    name: string
    email: string
    password: string
    confirmPassword: string
    rol: string
    estatusUsuario: StatusUser
}