
export interface DeleteModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    onConfirmDelete: (id: string) => void;
    entity:string;
    itemEntity: T;
    deleteRoute: string;
}