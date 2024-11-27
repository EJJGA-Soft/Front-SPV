import React, { useEffect, useState } from "react";
import { ProveedoresTableProps } from "../../interfaces/ProveedoresTableProps";
import ProveedoresModal from "./ModalProveedores";
import { HiPencil, HiTrash } from 'react-icons/hi';
import ConfirmDeleteModal from "../ModalDelete";
import { IProveedores } from '../../interfaces/Proveedores/proveedor_interface';
import LoadingTables from "../loading/loadingtables";
import ProveedorService from "../../modules/services/proveedor/proveedores_service";
import { enqueueSnackbar } from 'notistack';
import { UserStore } from "../../security/store/userStore";

const ProveedoresTable: React.FC<ProveedoresTableProps> = ({
  proveedores, currentPage, proveedoresPerPage, handleNextPage, handlePrevPage,   isLoading, onProveedoresUpdate

}) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<IProveedores | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [proveedorAEliminar, setProveedorAEliminar] = useState<IProveedores | null>(null);
  const {rol} = UserStore();

  const indexOfLastProveedor = currentPage * proveedoresPerPage;
  const indexOfFirstProveedor = indexOfLastProveedor - proveedoresPerPage;
  const currentProveedores = proveedores.slice(indexOfFirstProveedor, indexOfLastProveedor);
  const emptyRows = proveedoresPerPage - currentProveedores.length;

  const handleOpenModal = (proveedor: IProveedores) => {
    setProveedorSeleccionado(proveedor);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProveedorSeleccionado(null);
  };

  const handleOpenDeleteModal = (proveedor: IProveedores) => {
    const stockTotal = proveedor.productos?.reduce((total, producto) => total + producto.stock, 0) || 0;
    setProveedorAEliminar({ ...proveedor, stockTotal });
    setDeleteModalOpen(true);
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setProveedorAEliminar(null);
  };

  const handleConfirmDelete = () => {
    if(proveedorAEliminar && proveedorAEliminar.id){
      onProveedoresUpdate();
      setDeleteModalOpen(false);
      setProveedorAEliminar(null);
    } else {
      console.log("Error: proveedor no encontrado");
    }
  };


  return (
    <div className="w-full h-auto">
    <div  className="overflow-x-auto">
    {isLoading ? (
      <LoadingTables/>
    ) : proveedores.length <= 0 ? (
      <div className="flex bg-white justify-center items-center h-80">
      <span className="text-gray-500 text-sm md:text-base lg:text-lg">
        No hay proveedores disponibles.
      </span>
    </div>
    ) : (
      <table className="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-white text-gray-700 text-center">
          <th className="p-4 text-xs sm:text-base">Nombre de la Empresa</th>
          <th className="p-4 text-xs sm:text-base">Productos del proveedor</th>
          <th className="p-4 text-xs sm:text-base">Número de Contacto</th>
          {rol !== 'Empleado' && (
            <th className="p-4 text-xs sm:text-base">Acciones</th>
          )}        </tr>
      </thead>
      <tbody>
        {currentProveedores.map((proveedor, index) => (
          <tr key={index} className="border-t border-gray-200 text-center text-sm">
            <td className="p-4 break-all">{proveedor.nombreEmpresa}</td>
            <td className="p-4 break-all">
            {proveedor.productos && proveedor.productos.length > 0 
              ? proveedor.productos.map((producto) => producto.nombre).join(", ") 
              : "Sin productos"}
            </td>
            <td className="p-4 break-all">{proveedor.numeroCelular}</td>
            {rol !== 'Empleado' && (
              <td className="p-4 flex justify-center space-x-4">

              <button
                onClick={() => handleOpenModal(proveedor)}
                className="text-blue-500 hover:text-blue-700"
                aria-label="Editar proveedor"
              >
                <HiPencil className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleOpenDeleteModal(proveedor)}
                className="text-red-500 hover:text-red-700"
                aria-label="Eliminar proveedor"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            </td>
            )}
            
          </tr>
        ))}

        {emptyRows > 0 && 
          [...Array(emptyRows)].map((_, index) => (
          <tr key={`empty-${index}`} className="border-t border-gray-200 text-center">
          <td colSpan="4" className="p-4 text-center">&nbsp;</td>
    
          </tr>
        ))}
      </tbody>
    </table>
    )}
    </div>
   

    

      {proveedorSeleccionado && isModalOpen && (
        <ProveedoresModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          proveedor={proveedorSeleccionado}
          onSave={onProveedoresUpdate}
        />
      )}

      {proveedorAEliminar && isDeleteModalOpen && (
        <ConfirmDeleteModal<IProveedores>
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirmDelete={(id:string) => {
          handleConfirmDelete();
        }}
        entity={`proveedor con un total ${proveedorAEliminar.stockTotal || 0} productos`}
        itemEntity={proveedorAEliminar}
        deleteRoute={`/Proveedor/${proveedorAEliminar.id}`}
        />
      )}
    </div>
  );
};

export default ProveedoresTable;
