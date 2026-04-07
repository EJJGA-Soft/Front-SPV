import { Producto } from "../Inventario/producto_interface";

interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

export interface CobroModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCuenta: number;
  productos: CarritoItem[];
  resetCarrito: () => void;
  actualizarNumeroVenta: (fn: (prev: number) => number) => void;
}
