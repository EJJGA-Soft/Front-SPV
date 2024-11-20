import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import ProveedoresTable from "../../../components/proveedores/ProveedoresTable";
import ProveedoresModal from "../../../components/proveedores/ModalProveedores";
import ProveedorService from "../../services/proveedor/proveedores_service";
import { IProveedores } from "../../../interfaces/proveedor_interface";
import LoadingView from "../../../components/loading/loading";

const Proveedores = new ProveedorService();

const ProveedoresHome: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const proveedoresPerPage = 7;
  const [proveedores, setProveedores] = useState<IProveedores[]>([]);
  const [IsLoading, setIsLoading] = useState<boolean>(false);

  async function GetProveedores(): Promise<IProveedores[]> {
    setIsLoading(true);
  
    try {
      const response = await Proveedores.getProveedores();

      if(response.success){
      const convert = response.data as IProveedores[];
      setProveedores(convert);
      setIsLoading(false);
      return convert;
      }
      return [];
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
      throw error;
    }
  }
  

  useEffect(() => {
    GetProveedores()
  }, [])



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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  const handleSaveProveedor = (nuevoProveedor: Proveedores) => {
    console.log("Proveedor guardado:", nuevoProveedor);
    handleCloseModal();
  };

  return (
    <Layout>
    <div className=" bg-gray-100 sm:py-10 px-4 sm:px-6 lg:px-8 pt-6 pb-[95px] lg:mt-[-70px]">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl sm:text-3xl font-semibold text-base sm:text-lg">
          Proveedores</h1>
          <button 
          className="font-semibold px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-base"
          onClick={handleOpenModal} 
          >
            Agregar proveedor
          </button>
        </div>
        
        <div className="overflow-x-auto max-h-[500px] sm:max-h-full">
      { IsLoading ? (
          <LoadingView/>
        ) : (
          <ProveedoresTable
          proveedores={proveedores}
          currentPage={currentPage}
          proveedoresPerPage={proveedoresPerPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
        )}
        </div>

        <div className="flex justify-between items-center mt-4 flex-wrap">
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
      

        
        {isModalOpen && <ProveedoresModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveProveedor} />}
      </div>
    </Layout>
  );
};

export default ProveedoresHome;
