import React, { useState } from "react";
import { Proveedores } from "../../../interfaces/proveedores_interface";
import Layout from "../../../components/layout/layout";
import ProveedoresTable from "../../../components/proveedores/ProveedoresTable";
import ProveedoresModal from "../../../components/proveedores/ModalProveedores";

const ProveedoresHome: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const proveedoresPerPage = 7;

  const proveedores: Proveedores[] = [
    { id: 1, nombreEmpresa: "Sabritas", productoProveedor: ["Sabritas", "Chetos", "Packetazos"], numeroContacto: "9983456780" },
    { id: 2, nombreEmpresa: "Coca Cola", productoProveedor: ["Coca Cola", "Fanta", "Sprite"], numeroContacto: "9983456780" },
    { id: 3, nombreEmpresa: "Bimbo", productoProveedor: ["Pan Bimbo", "Galletas Marinela", "Tortillas Milpa Real"], numeroContacto: "9983456780" },
    { id: 4, nombreEmpresa: "Lala", productoProveedor: ["Leche Lala", "Yogurt Lala", "Queso Lala"], numeroContacto: "9983456780" },
    { id: 5, nombreEmpresa: "Nestlé", productoProveedor: ["Nescafé", "Chocolates Nestlé", "Helados Nestlé"], numeroContacto: "9983456780" },
    { id: 6, nombreEmpresa: "PepsiCo", productoProveedor: ["Pepsi", "Gatorade", "Quaker"], numeroContacto: "9983456780" },
    { id: 7, nombreEmpresa: "Grupo Modelo", productoProveedor: ["Corona", "Modelo Especial", "Victoria"], numeroContacto: "9983456780" },
    { id: 8, nombreEmpresa: "Danone", productoProveedor: ["Yogurt Danone", "Agua Bonafont", "Actimel"], numeroContacto: "9983456780" },
  ];

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
      <div className="container mx-auto min-h-screen h-screen flex flex-col px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Proveedores</h1>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-base"
            onClick={handleOpenModal} 
          >
            Agregar proveedor
          </button>
        </div>
        
        <ProveedoresTable
          proveedores={proveedores}
          currentPage={currentPage}
          proveedoresPerPage={proveedoresPerPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
        
        {isModalOpen && <ProveedoresModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveProveedor} />}
      </div>
    </Layout>
  );
};

export default ProveedoresHome;
