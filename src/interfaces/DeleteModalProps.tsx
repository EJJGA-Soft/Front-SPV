export interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmDelete: (id: string) => void;
    entity:string;
    itemEntity:string;
}