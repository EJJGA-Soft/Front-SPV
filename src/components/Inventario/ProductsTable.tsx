import { HiPencil, HiTrash } from 'react-icons/hi';

const ProductsTable = () => {
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
              <tr className="border-t border-gray-200 text-center text-sm">
                <td className="p-4 break-all">15</td>
                <td className="py-3 px-6 text-center">
                  <img
                    alt="Imagen de Frijol 1kg"
                    height={50}
                    src="https://storage.googleapis.com/a1aa/image/ytf829Yj7NRlIqxhx8zdPeVzvA7238ffJaEOQ1ssNH9NrRDPB.jpg"
                    width={50}
                    className="mx-auto"
                  />
                </td>
                <td className="p-4 break-all">Frijol</td>
                <td className="p-4 break-all">$32.50</td>
                <td className="p-4 break-all">Leguminosas</td>
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

            </tbody>
          </table>

          {/* Paginacion */}
          <div className="flex justify-between items-center mt-6">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-base"
            >
              Antes
            </button>
            <span className="text-gray-700 text-xs sm:text-base">Página</span>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-base"
            >
              Siguiente
            </button>
          </div>
        </div>

    </>
  );
};

export default ProductsTable;
