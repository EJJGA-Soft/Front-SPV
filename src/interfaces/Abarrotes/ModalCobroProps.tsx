export interface CobroModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalCuenta:number;
    productos: Producto[];
  }