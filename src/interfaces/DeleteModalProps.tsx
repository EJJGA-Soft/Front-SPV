import { IAccount } from "./newAccount._interface";

export interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmDelete: (id: string) => void;
    entity:string;
    itemEntity:IAccount;
}