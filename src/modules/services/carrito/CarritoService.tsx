import { Producto } from "../../../interfaces/Inventario/producto_interface";

class CarritoService {
  calcularTotal(carrito: { producto: Producto; cantidad: number }[]): number {
    return carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  agregarProducto(
    carrito: { producto: Producto; cantidad: number }[],
    producto: Producto
  ): { producto: Producto; cantidad: number }[] {
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

  eliminarProducto(
    carrito: { producto: Producto; cantidad: number }[],
    productoId: number
  ): { producto: Producto; cantidad: number }[] {
    return carrito
      .map((item) =>
        item.producto.id === productoId
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0);
  }
}

export default new CarritoService();
