import { Producto } from "../../Inventario/producto_interface";

export interface IVenta {
    id: number;
    fechaRegistro: string;
    tipoPago: number;
    pago: number;
    usuarioId: string;
  }