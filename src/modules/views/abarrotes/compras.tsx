import React, { useCallback, useEffect, useState } from "react";
import CobroModal from "../../../components/abarrotes/ModalCobro";
import Layout from "../../../components/layout/layout";
import { Producto } from "../../../interfaces/Inventario/producto_interface";
import inventoryService from "../../services/Inventario/InventoryService";
import { Api_Connection } from "../../services/API/api_connection";
import CarritoService from "../../services/carrito/CarritoService";
import { FaPlus } from "react-icons/fa";
import BaseService from "../../services/base_service";
import { ICategoria } from '../../../interfaces/Categorias/categories_interface';
import { UserStore } from "../../../security/store/userStore";
import { useSnackbar } from "notistack";

const Compras: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategories] = useState<ICategoria[]>([]);
  const [carrito, setCarrito] = useState<{ producto: Producto; cantidad: number }[]>([]);
  const [total, setTotal] = useState(0);
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState<number | null>(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [isCarritoVacio, setIsCarritoVacio] = useState(true);
  
  const usuario = UserStore((state)=>state.name);
  const url = `${Api_Connection()}`;
  const urlImg = url.replace("/api/", "");
  const baseService = new BaseService();

  useEffect(() => {
    const obtenerProductos = async () => {
      const service = new inventoryService();
      try {
        const response = await service.getProducts();
        if (response.success) {
          setProductos(response.data);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    obtenerProductos();
    getCategories();
  }, []);

  useEffect(() => {
    setIsCarritoVacio(carrito.length === 0);
  }, [carrito]);
  
  const resetCarrito = () => {
    setCarrito([]);
    setTotal(0);
  };

  const agregarAlCarrito = useCallback((producto: Producto) => {
    if(producto.stock === 0){
      enqueueSnackbar('El producto no tiene stock disponible.', {variant:'error'});
      return;
    }
    console.log("Producto a agregar:", producto); 
    setCarrito((prevCarrito) => CarritoService.agregarProducto(prevCarrito, producto));
  }, []);

  const eliminarDelCarrito = useCallback((productoId: number) => {
    setCarrito((prevCarrito) => CarritoService.eliminarProducto(prevCarrito, productoId));
  },[]);

  useEffect(() => {
    const nuevoTotal = CarritoService.calcularTotal(carrito);
    setTotal(nuevoTotal);
  }, [carrito]);

  const handleSeleccionarProducto = (productoId: number) => {
    setProductoSeleccionadoId(productoId);
  };

  const handleCobrarClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSeleccionarCategoria = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoriaId = e.target.value ? parseInt(e.target.value, 10) : null;
    setCategoriaSeleccionada(categoriaId);
  };

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((producto) => producto.categoriaId === categoriaSeleccionada)
    : productos;

  const getCategories = async () => {
    try {
        const response = await baseService.Get<ICategoria>("/Categorias");
        if (response.success) {
            setCategories(response.data as ICategoria[]);
        }
    } catch (error) {
        console.error("Error al obtener categorías:", error);
    }
};
  

  return (
    <>
      <Layout>
        <div className="flex flex-col md:flex-row justify-between p-4 bg-gray-100 min-h-screen">
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0">
            <h1 className="text-xl font-semibold mb-4">Venta 1</h1>
            <p className="mb-2">Usuario: {usuario}</p>
            <p className="mb-6 text-xl font-bold">Total: ${total.toFixed(2)}</p>

            <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border-r border-gray-300">Cantidad</th>
                  <th className="p-2 border-r border-gray-300">Nombre del producto</th>
                  <th className="p-2">Precio</th>
                </tr>
              </thead>
              <tbody>
              {carrito.length === 0 ? (
                <tr>
                      <td colSpan={3} className="p-2 text-center text-gray-500">No hay productos</td>
                    </tr>
              ) : (
                carrito.map((item, index) => (
                  <tr
                    key={item.producto.id}
                    className={productoSeleccionadoId === item.producto.id ? "bg-blue-100" : ""}
                    onClick={() => handleSeleccionarProducto(item.producto.id)}
                  >
                    <td className="p-2 text-center border-r border-gray-300">{item.cantidad}</td>
                    <td className="p-2 border-r border-gray-300">{item.producto.nombre}</td>
                    <td className="p-2 text-right">
                      ${(item.producto.precio * item.cantidad).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
               
              </tbody>
            </table>
            </div>


            <div className="flex items-center justify-center mt-6 space-x-4">
              <button
                className={`bg-red-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold ${
                  productoSeleccionadoId ? "" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() =>
                  productoSeleccionadoId
                    ? eliminarDelCarrito(productoSeleccionadoId)
                    : alert("Selecciona un producto para eliminar")
                }
                disabled={!productoSeleccionadoId}
              >
                -
              </button>
              <button
                className={`bg-blue-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold ${
                  productoSeleccionadoId ? "" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (productoSeleccionadoId) {
                    const producto = carrito.find(
                      (item) => item.producto.id === productoSeleccionadoId
                    )?.producto;
                    if (producto) agregarAlCarrito(producto);
                  } else {
                    alert("Selecciona un producto para agregar");
                  }
                }}
                disabled={!productoSeleccionadoId}
              >
                +
              </button>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleCobrarClick}
                className={`bg-green-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 ${isCarritoVacio ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isCarritoVacio}
                >
                <span>Cobrar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full md:w-[60vh] bg-white p-4 rounded-lg shadow-md flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Productos</h2>
            

            <select 
            className="w-full mb-6 p-2 border border-gray-300 rounded"
            onChange={handleSeleccionarCategoria}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria)=>(
                <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 sm:grid-cols-3 p-8 md:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar max-h-[600px]">
              {productosFiltrados.map((producto) => (
                <div
                  key={producto.id}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col items-center justify-between"
                >
                <div className="relative group">
                <img
                src={`${urlImg}${producto.urlImagen}`}
                alt={producto.nombre}
                className="h-24 w-auto object-contain"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-opacity duration-300">
              {producto.nombre}
              </div>
            </div>
            <p className="text-center mt-2 text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-full">{producto.nombre}</p>

              
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="bg-yellow-500 text-white px-2 py-2 mt-4 rounded-lg"
                  >
                    <FaPlus className="mx-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <CobroModal isOpen={isModalOpen} onClose={handleCloseModal} totalCuenta={total}  productos={carrito} resetCarrito={resetCarrito}  />
        </div>
      </Layout>
    </>
  );
};

export default Compras;
