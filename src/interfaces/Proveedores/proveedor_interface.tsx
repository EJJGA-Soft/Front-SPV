import { Producto } from "../Inventario/producto_interface";

export interface IProveedores {
    id: number;
    nombreEmpresa: string;
    numeroCelular: string;
    productos: Producto[];
    esBorrado: boolean;
}