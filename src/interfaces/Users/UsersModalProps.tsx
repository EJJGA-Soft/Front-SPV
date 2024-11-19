import { IUser } from "../user_interface";


export interface UsuariosModalProps{
    isOpen:  boolean;
    onClose: () => void;
    user?: IUser;
    onSave: (user: IUser) => void;
}