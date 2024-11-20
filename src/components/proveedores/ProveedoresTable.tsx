import React, { useEffect, useState } from "react";
import { ProveedoresTableProps } from "../../interfaces/ProveedoresTableProps";
import ProveedoresModal from "./ModalProveedores";
import { HiPencil, HiTrash } from 'react-icons/hi';
import ConfirmDeleteModal from "../ModalDelete";
import { IProveedores } from '../../interfaces/Proveedores/proveedor_interface';
import LoadingTables from "../loading/loadingtables";
import ProveedorService from "../../modules/services/proveedor/proveedores_service";
import { enqueueSnackbar } from 'notistack';

const ProveedoresTable: React.FC<ProveedoresTableProps> = ({
  proveedores, currentPage, proveedoresPerPage, handleNextPage, handlePrevPage,   isLoading,

}) => {

  const [proveedoresState, setProveedores] =useState<IProveedores[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<IProveedores | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [proveedorAEliminar, setProveedorAEliminar] = useState<IProveedores | null>(null);
  

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
    setProveedorAEliminar(proveedor);
    setDeleteModalOpen(true);
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setProveedorAEliminar(null);
  };

  const handleConfirmDelete = async () => {
    const { enqueueSnackbar } = useSnackbar();

   if(proveedorAEliminar && proveedorAEliminar.id) {
    const service = new ProveedorService();
    const response = await service.DeleteProvService(proveedorAEliminar.id);
    if(response.success){
      setProveedores(proveedoresState.filter(p => p.id !== proveedorAEliminar.id));
      setDeleteModalOpen(false);
      setProveedorAEliminar(null);
      enqueueSnackbar(`Proveedor ${proveedorAEliminar.nombreEmpresa} eliminado correctamente.`, { variant: 'success' });

    } else {
      enqueueSnackbar(`Error: ${response.message}`, { variant: 'error' });
    }
   } else {
    enqueueSnackbar("Proveedor no encontrado o no tiene un ID válido", { variant: 'error' });
   }
  };

  useEffect(() => {
    const obtenerProveedores = async () =>{
      const service = new ProveedorService();
      const response = await service.getProveedoreswithProductos();
      if(response.success){
        setProveedores(response.data);
      } else{
        console.error(response.message);
      }
      setLoading(false);
    };
    obtenerProveedores();
  },[]);

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
          <th className="p-4 text-xs sm:text-base">Acciones</th>
        </tr>
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
        />
      )}

      {proveedorAEliminar && isDeleteModalOpen && (
        <ConfirmDeleteModal 
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirmDelete={handleConfirmDelete}
          entity="proveedor"
          itemEntity={proveedorAEliminar.nombreEmpresa}
        />
      )}
    </div>
  );
};

export default ProveedoresTable;
