import React, { useState } from "react";
import { ProveedoresTableProps } from "../../interfaces/ProveedoresTableProps";
import ProveedoresModal from "./ModalProveedores";
import { HiPencil, HiTrash } from 'react-icons/hi';

interface Proveedor {
  nombreEmpresa: string;
  productoProveedor: string[];
  numeroContacto: string;
}

const ProveedoresTable: React.FC<ProveedoresTableProps> = ({
  proveedores, currentPage, proveedoresPerPage, handleNextPage, handlePrevPage,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<Proveedor | null>(null);

  const indexOfLastProveedor = currentPage * proveedoresPerPage;
  const indexOfFirstProveedor = indexOfLastProveedor - proveedoresPerPage;
  const currentProveedores = proveedores.slice(indexOfFirstProveedor, indexOfLastProveedor);

  const emptyRows = proveedoresPerPage - currentProveedores.length;

  const handleOpenModal = (proveedor: Proveedor) => {
    setProveedorSeleccionado(proveedor);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProveedorSeleccionado(null);
  };

  return (
    <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-white text-gray-700 text-center">
            <th className="p-4 text-xs sm:text-base">Nombre de la Empresa</th>
            <th className="p-4 text-xs sm:text-base">Productos del proveedor</th>
            <th className="p-4 text-xs sm:text-base">Número de Contacto</th>
            <th className="p-4 text-xs sm:text-base">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProveedores.map((proveedor, index) => (
            <tr key={index} className="border-t border-gray-200 text-center text-sm">
              <td className="p-4 break-all">{proveedor.nombreEmpresa}</td>
              <td className="p-4 break-all">{proveedor.productoProveedor.join(", ")}</td>
              <td className="p-4 break-all">{proveedor.numeroContacto}</td>
              <td className="p-4 flex justify-center space-x-4">
                <button
                  onClick={() => handleOpenModal(proveedor)}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Editar proveedor"
                >
                  <HiPencil className="w-5 h-5" />
                </button>

                <button
                  onClick={() => console.log("Eliminar proveedor", proveedor.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Eliminar proveedor"
                >
                  <HiTrash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}

          {emptyRows > 0 && Array.from({ length: emptyRows }).map((_, index) => (
            <tr key={`empty-${index}`} className="border-t border-gray-200 text-center">
              <td className="p-4">&nbsp;</td>
              <td className="p-4">&nbsp;</td>
              <td className="p-4">&nbsp;</td>
              <td className="p-4">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-base"
        >
          Antes
        </button>
        <span className="text-gray-700 text-xs sm:text-base">Página {currentPage} de {Math.ceil(proveedores.length / proveedoresPerPage)}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage * proveedoresPerPage >= proveedores.length}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-base"
        >
          Siguiente
        </button>
      </div>

      {proveedorSeleccionado && isModalOpen && (
        <ProveedoresModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          proveedor={proveedorSeleccionado}
          onSave={(proveedor) => {
            console.log("Proveedor actualizado:", proveedor);
          }}
        />
      )}
    </div>
  );
};

export default ProveedoresTable;
