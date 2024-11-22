export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    urlImagen: string;
    Imagen: Blob;
    categoriaId?: number;
    proveedorId?: number;
    esBorrado: boolean;
    nombreCategoria?: string;
    nombreProveedor?: string;
  }
  