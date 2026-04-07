export interface IVentaProducto{
    id: number;
    precioUnitario: number;
    stockVendido: number;
    productoId: number;
    ventaId: number;
    esBorrado: boolean;
}