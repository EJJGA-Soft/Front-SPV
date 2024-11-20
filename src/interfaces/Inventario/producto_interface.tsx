export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    urlImagen: string;
    categoriaId: number;
    proveedorId: number;
    esBorrado: boolean;
  }
  