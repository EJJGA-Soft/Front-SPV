import { StatusUser } from "../enum/enum";

export interface IUser {
    id: number;
    name: string;
    email: string;
    rol: string;
    activo: StatusUser;
    isDeleted: boolean;
  }