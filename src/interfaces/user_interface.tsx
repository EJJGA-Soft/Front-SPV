import { StatusUser } from "../enum/enum";

export interface IUser {
    id: string;
    name: string;
    email: string;
    rol?: string;
    activo: StatusUser;
    isDeleted: boolean;
    estatusUsuario: StatusUser;
  }