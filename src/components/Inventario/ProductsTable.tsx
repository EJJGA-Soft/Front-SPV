import { useState, useEffect } from "react";
import { HiPencil, HiTrash } from 'react-icons/hi';
import { Producto } from "../../interfaces/Inventario/producto_interface";
import { Api_Connection } from "../../modules/services/API/api_connection";
import LoadingTables from "../loading/loadingtables";
import BaseService from "../../modules/services/base_service";
import ConfirmDeleteModal from "../ModalDelete";
import { useSnackbar } from "notistack";

interface Props {
  reload: boolean;
  setReload: (value: boolean) => void;
}

const ProductsTable: React.FC<Props> = ({ reload, setReload }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productosPerPage = 10;
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<Producto | null>(null);
  const { enqueueSnackbar } = useSnackbar(); // Hook para los mensajes interactivos

  const baseService = new BaseService();

  // Calcular los índices para la paginación
  const indexOfLastProducto = currentPage * productosPerPage;
  const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
  const currentProductos = productos.slice(indexOfFirstProducto, indexOfLastProducto);

  // URL de la API
  const url = `${Api_Connection()}`;
  const urlImg = url.replace('/api/', '');

  //  Método para obtener los productos
  async function getProductos(): Promise<void> {
    setIsLoading(true);
    setError(null);

    try {
      setIsLoading(true);
      const response = await baseService.Get<Producto>("/Productos/ProductsWithCategory")
      if (response.success) {
        const result = response.data as Producto[];

        setIsLoading(false);
        setProductos(result);
        console.log(result);
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

  // Manejo de la eliminación
  const HandleConfirmDelete = () => {
    enqueueSnackbar(`Producto "${productToDelete?.nombre}" eliminado exitosamente.`, {
      variant: "success",
    });
    getProductos();
    setProductToDelete(null);
  }

  const HandleClose = () => {
    setProductToDelete(null);
    setOpenModalDelete(false);
  }

  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    if (reload) {
      getProductos().then(() => setReload(false));
    }
  }, [reload, setReload]);

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
    <div className="w-full h-auto">
      {/* TABLA */}
      <div className="overflow-x-auto custom-scrollbar">
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
                <th className="p-4 text-xs sm:text-base">Proveedor</th>
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
                    <td className="p-4 break-all">{producto.nombreCategoria}</td>
                    <td className="p-4 break-all">{producto.nombreProveedor}</td>
                    <td className="p-4 flex justify-center space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Editar producto"
                      >
                        <HiPencil className="w-5 h-5" />
                      </button>

                      <button
                        className="text-red-500 hover:text-red-700"
                        aria-label="Eliminar producto"
                        onClick={() => {
                          setOpenModalDelete(true);
                          console.log(producto)
                          setProductToDelete(producto);
                        }}
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

      {/* Modal de Confirmación */}
      {openModalDelete && (
        <>
          <ConfirmDeleteModal
            isOpen={openModalDelete}
            onClose={HandleClose}
            onConfirmDelete={() => {
              HandleConfirmDelete();
            }}
            entity={"producto"}
            itemEntity={productToDelete}
            deleteRoute={`/Productos/${productToDelete!.id}`}
          />
        </>
      )}

  </div>
    </>
  );
};

export default ProductsTable;