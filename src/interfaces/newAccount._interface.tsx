import { StatusUser } from "../enum/enum"

export interface IAccount{
    id?: string;
    name: string
    email: string
    password?: string
    confirmPassword?: string
    rol: string
    estatusUsuario: StatusUser
    isDeleted: boolean;
    currentPassword?: string
}