import { IProveedores } from "./proveedor_interface";

export interface ProveedoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  proveedor?: IProveedores;
  onSave: (proveedor: IProveedores) => void;
}
