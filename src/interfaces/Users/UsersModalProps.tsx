import { IAccount } from "../newAccount._interface";


export interface UsuariosModalProps{
    isOpen:  boolean;
    onClose: () => void;
    user?: IAccount;
    onSave: (user: IAccount) => void;
}