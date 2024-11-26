import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import VentasTable from "../../../components/abarrotes/VentasTable";
import BaseService from "../../services/base_service";
import { Api_Connection } from "../../services/API/api_connection";
import { IVenta } from "../../../interfaces/Abarrotes/Ventas/ventas_interface";

const baseService = new BaseService();

const VentasHome: React.FC = () => {
  const [ventas, setVentas] = useState<IVenta[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ventasPerPage = 7;
  const [isLoading, setIsLoading] = useState(false);
  const [usuarioNombre, setUsuarioNombre] = useState<string | null>(null);
  const [productos, setProductos] = useState<any[]>([]);

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prevPage) =>
      direction === "next" ? prevPage + 1 : prevPage - 1
    );
  };

  const obtenerVentas = async () => {
    try {
      setIsLoading(true);
      const { success, data } = await baseService.Get<{ success: boolean; data: IVentas[] }>(`${Api_Connection()}Venta`);
      if (success) setVentas(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    }
  };
  

  const getUserById = async (uid: string) => {
    try {
      const { success, data } = await baseService.Get<{ success: boolean; data: { name: string } }>(`${Api_Connection()}Account/GetUserById/${uid}`);
      success && setUsuarioNombre(data.name);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  return (
    <Layout>
      <div className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 md:mt-[-40px]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Detalle de Ventas</h1>
        </div>

        <div className="overflow-x-auto max-h-[500px]">
        <VentasTable
          ventas={ventas}
          currentPage={currentPage}
          ventasPerPage={ventasPerPage}
          handleNextPage={() => handlePageChange("next")}
          handlePrevPage={() => handlePageChange("prev")}
          isLoading={isLoading}
          getUserById={getUserById}
          setProductos={setProductos}
          setUsuarioNombre={setUsuarioNombre}
          usuarioNombre={usuarioNombre} 
      />
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="text-gray-700">
            Página {currentPage} de {Math.ceil(ventas.length / ventasPerPage)}
          </span>

          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage * ventasPerPage >= ventas.length}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default VentasHome;
