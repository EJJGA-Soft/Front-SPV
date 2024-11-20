import { Proveedores } from "./proveedores_interface";

export interface ProveedoresModalProps{
    isOpen:  boolean;
    onClose: () => void;
    proveedor?: Proveedores;
    onSave: (proveedor: Proveedores) => void;
}