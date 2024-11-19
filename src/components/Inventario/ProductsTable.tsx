import React from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { ProductsTableProps } from '../../interfaces/Inventario/ProductsTableProps';

const ProductsTable: React.FC<ProductsTableProps> = ({ productos = [],
  currentPage,
  productosPerPage,
  handleNextPage,
  handlePrevPage, }) => {

  // Calcular los índices para la paginación
  const indexOfLastProducto = currentPage * productosPerPage;
  const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
  const currentProductos = productos.slice(indexOfFirstProducto, indexOfLastProducto);


  return (
    <>
      {/* TABLA */}
      <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
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
          {currentProductos.map((producto, index) => (
            <tr key={index} className="border-t border-gray-200 text-center text-sm">
              <td className="p-4 break-all">{producto.stock}</td>
              <td className="py-3 px-6 text-center">
                <img
                  alt={producto.nombre}
                  height={50}
                  src={producto.urlImagen}
                  width={50}
                  className="mx-auto"
                />
              </td>
              <td className="p-4 break-all">{producto.nombre}</td>
              <td className="p-4 break-all">{producto.precio.toFixed(2)}</td>
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
          ))}

            
          </tbody>
        </table>
      </div>

    </>
  );
};

export default ProductsTable;
