import { useState, useEffect } from "react";
import { HiPencil, HiTrash } from 'react-icons/hi';
import { Producto } from "../../interfaces/Inventario/producto_interface";
import inventoryService from "../../modules/services/Inventario/InventoryService";
import { Api_Connection } from "../../modules/services/API/api_connection";
import LoadingTables from "../loading/loadingtables";

const ProductsTable = () => {
  // Estado para manejar la lista de productos
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productosPerPage = 10;

  const Productos = new inventoryService();

  // Calcular los índices para la paginación
  const indexOfLastProducto = currentPage * productosPerPage;
  const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
  const currentProductos = productos.slice(indexOfFirstProducto, indexOfLastProducto);

  // URL de la API
  const url = `${Api_Connection()}`;
  const urlImg = url.replace('/api/', '');

  // Obtener los productos
  async function getProductos(): Promise<void> {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Productos.getProducts();

      if (response.success) {
        const convert = response.data as Producto[];
        setProductos(convert);
      } else {
        setError('No se pudieron obtener los productos.');
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError('Ha ocurrido un error al intentar obtener los productos.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProductos();
  }, []);

  // Paginación
  const handleNextPage = () => {
    if (currentPage * productosPerPage < productos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {/* TABLA */}
      <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
        {isLoading ? (
          <LoadingTables />
        ) : error ? (
          <div className="text-red-500 text-center font-semibold">{error}</div>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-white text-gray-700 text-center">
                <th className="p-4 text-xs sm:text-base">Stock</th>
                <th className="p-4 text-xs sm:text-base">Imagen</th>
                <th className="p-4 text-xs sm:text-base">Nombre</th>
                <th className="p-4 text-xs sm:text-base">Precio</th>
                <th className="p-4 text-xs sm:text-base">Categoría</th>
                <th className="p-4 text-xs sm:text-base">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {currentProductos.length === 0 ? (
                <tr className='border-t border-gray-200 text-center text-sm'>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    No hay productos disponibles.
                  </td>
                </tr>
              ) : (
                currentProductos.map((producto) => (
                  <tr key={producto.id} className="border-t border-gray-200 text-center text-sm">
                    <td className="p-4 break-all">{producto.stock}</td>
                    <td className="py-3 px-6 text-center">
                      <img
                        alt={producto.nombre}
                        height={50}
                        src={`${urlImg}${producto.urlImagen}`}
                        width={50}
                        className="mx-auto"
                      />
                    </td>
                    <td className="p-4 break-all">{producto.nombre}</td>
                    <td className="p-4 break-all">$ {producto.precio.toFixed(2)}</td>
                    <td className="p-4 break-all">{producto.categoriaId}</td>
                    <td className="p-4 flex justify-center space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Editar proveedor"
                      >
                        <HiPencil className="w-5 h-5" />
                      </button>

                      <button
                        className="text-red-500 hover:text-red-700"
                        aria-label="Eliminar proveedor"
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6 flex-wrap">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs sm:text-base"
        >
          Antes
        </button>

        <span className="text-gray-900 text-xs sm:text-base font-semibold">
          Página {currentPage} de {Math.ceil(productos.length / productosPerPage)}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage * productosPerPage >= productos.length}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs sm:text-base"
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default ProductsTable;