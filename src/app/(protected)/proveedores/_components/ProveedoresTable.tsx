'use client'
import { useEffect, useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import ModalProveedores from "./ModalProveedores";
import ConfirmDeleteModal from "@/components/ModalDelete";
import { IProveedores } from "@/interfaces/Proveedores/proveedor_interface";
import LoadingTables from "@/components/loading/loadingtables";
import BaseService from "@/services/base_service";
import { UserStore } from "@/global/userStore";

interface ProveedoresTableProps {
  reload: boolean;
  setReload: (value: boolean) => void;
}

const baseService = new BaseService();

const ProveedoresTable: React.FC<ProveedoresTableProps> = ({ reload, setReload }) => {
  const [proveedores, setProveedores] = useState<IProveedores[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [proveedorToDelete, setProveedorToDelete] = useState<IProveedores | null>(null);
  const [proveedorToEdit, setProveedorToEdit] = useState<IProveedores | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const proveedoresPerPage = 5;
  const { rol } = UserStore();

  const indexOfLastProveedor = currentPage * proveedoresPerPage;
  const indexOfFirstProveedor = indexOfLastProveedor - proveedoresPerPage;
  const currentProveedores = proveedores.slice(indexOfFirstProveedor, indexOfLastProveedor);

  const handleNextPage = () => {
    if (currentPage * proveedoresPerPage < proveedores.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getProveedores = async () => {
    setLoading(true);
    const response = await baseService.Get<IProveedores>("/Proveedor");
    if (response.success) {
      setProveedores(response.data as IProveedores[]);
    }
    setLoading(false);
  };

  const HandleClose = () => {
    setProveedorToDelete(null);
    setOpenModalDelete(false);
  };

  const HandleConfirmDelete = () => {
    getProveedores();
    setProveedorToDelete(null);
  };

  const HandleCloseEdit = () => {
    setOpenModalEdit(false);
    setProveedorToEdit(null);
  };

  const HandleSaveEdit = () => {
    getProveedores();
    setProveedorToEdit(null);
  };

  useEffect(() => {
    getProveedores();
  }, []);

  useEffect(() => {
    if (reload) {
      getProveedores().then(() => setReload(false));
    }
  }, [reload, setReload]);

  return (
    <>
      {loading ? (
        <LoadingTables />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-white text-gray-700 text-center">
                <th className="p-4 text-xs sm:text-base">Nombre de la empresa</th>
                <th className="p-4 text-xs sm:text-base">Productos</th>
                <th className="p-4 text-xs sm:text-base">Número de contacto</th>
                {rol !== "Empleado" && (
                  <th className="p-4 text-xs sm:text-base">Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentProveedores.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    No hay proveedores disponibles.
                  </td>
                </tr>
              ) : (
                currentProveedores.map((proveedor, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 text-center text-sm"
                  >
                    <td className="p-4 break-all">{proveedor.nombreEmpresa}</td>
                    <td className="p-4 break-all">
                      {proveedor.productos && proveedor.productos.length > 0
                        ? proveedor.productos.map((p) => p.nombre).join(", ")
                        : "Sin productos"}
                    </td>
                    <td className="p-4 break-all">{proveedor.numeroCelular}</td>
                    {rol !== "Empleado" && (
                      <td className="p-4 flex justify-center space-x-4">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          aria-label="Editar proveedor"
                          onClick={() => {
                            setOpenModalEdit(true);
                            setProveedorToEdit(proveedor);
                          }}
                        >
                          <HiPencil className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          aria-label="Eliminar proveedor"
                          onClick={() => {
                            setOpenModalDelete(true);
                            setProveedorToDelete(proveedor);
                          }}
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-6 flex-wrap">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-sm md:text-base"
        >
          Antes
        </button>
        <span className="text-gray-700 text-xs sm:text-sm md:text-base my-2 sm:my-0">
          Página {currentPage} de {Math.ceil(proveedores.length / proveedoresPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage * proveedoresPerPage >= proveedores.length}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-sm md:text-base"
        >
          Siguiente
        </button>
      </div>

      {openModalDelete && (
        <ConfirmDeleteModal
          isOpen={openModalDelete}
          onClose={HandleClose}
          onConfirmDelete={HandleConfirmDelete}
          entity={"proveedor"}
          itemEntity={proveedorToDelete}
          deleteRoute={`/Proveedor/${proveedorToDelete!.id}`}
        />
      )}

      {openModalEdit && (
        <ModalProveedores
          isOpen={openModalEdit}
          onClose={HandleCloseEdit}
          onSave={HandleSaveEdit}
          itemEntity={proveedorToEdit!}
        />
      )}
    </>
  );
};

export default ProveedoresTable;
