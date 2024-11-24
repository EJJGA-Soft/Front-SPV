import { Producto } from "../../../interfaces/Inventario/producto_interface";

interface ItemCarrito{
  producto: Producto;
  cantidad: number;
}

class CarritoService {
  calcularTotal(carrito: ItemCarrito[]): number {
    return carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  agregarProducto(carrito: ItemCarrito[], producto: Producto) : ItemCarrito[] {
    const productoExistente = carrito.find((item) => item.producto.id === producto.id);
    if (productoExistente) {
      return carrito.map((item) =>
        item.producto.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    }
    return [...carrito, { producto, cantidad: 1 }];
  }

  eliminarProducto(carrito: ItemCarrito[], productoId:number): ItemCarrito[] {
    return carrito
      .map((item) =>
        item.producto.id === productoId
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0);
  }
  vaciarCarrito():ItemCarrito[]{
    return[];
  }



  
}

export default new CarritoService();
