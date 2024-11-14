import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiEye } from 'react-icons/hi'; // Icono de ver detalles
import Layout from '../../../components/layout/layout';

interface Venta {
  numeroVenta: number;
  fechaRegistro: string;
  tipoPago: string;
  total: number;
}

const VentasHome: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ventasPerPage = 10;

  const ventas: Venta[] = [
    { numeroVenta: 1, fechaRegistro: '28/08/2024', tipoPago: 'Efectivo', total: 327 },
    { numeroVenta: 2, fechaRegistro: '28/08/2024', tipoPago: 'Tarjeta', total: 430 },
  ];

  const indexOfLastVenta = currentPage * ventasPerPage;
  const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
  const currentVentas = ventas.slice(indexOfFirstVenta, indexOfLastVenta);

  const handleNextPage = () => {
    if (currentPage * ventasPerPage < ventas.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-10 min-h-screen flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Detalle de ventas</h1>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Exportar PDF
          </button>
        </div>

        {/* Tabla de ventas */}
        <div className="overflow-x-auto flex-grow">
          <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg h-full">
            <thead>
              <tr className="bg-white text-gray-700 text-center">
                <th className="p-4">Número de venta</th>
                <th className="p-4">Fecha de registro</th>
                <th className="p-4">Tipo de pago</th>
                <th className="p-4">Total</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentVentas.map((venta) => (
                <tr key={venta.numeroVenta} className="border-t border-gray-200 text-center">
                  <td className="p-4">{venta.numeroVenta}</td>
                  <td className="p-4">{venta.fechaRegistro}</td>
                  <td className="p-4">{venta.tipoPago}</td>
                  <td className="p-4">${venta.total.toFixed(2)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => navigate(`/ventas/${venta.numeroVenta}`)}
                      className="text-blue-500 hover:text-blue-700"
                      aria-label="Ver detalles"
                    >
                      <HiEye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {/* Filas vacías para llenar el espacio si hay pocos registros */}
              {Array.from({ length: ventasPerPage - currentVentas.length }).map((_, index) => (
                <tr key={`empty-${index}`} className="border-t border-gray-200 text-center">
                  <td className="p-4">&nbsp;</td>
                  <td className="p-4">&nbsp;</td>
                  <td className="p-4">&nbsp;</td>
                  <td className="p-4">&nbsp;</td>
                  <td className="p-4">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Antes
          </button>
          <span className="text-gray-700">Página {currentPage} de {Math.ceil(ventas.length / ventasPerPage)}</span>
          <button
            onClick={handleNextPage}
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
