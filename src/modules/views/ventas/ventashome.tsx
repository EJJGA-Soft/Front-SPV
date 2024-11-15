import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/layout/layout';
import VentasTable from '../../../components/abarrotes/VentasTable';

interface Venta {
  numeroVenta: number;
  fechaRegistro: string;
  tipoPago: string;
  total: number;
}

const VentasHome: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ventasPerPage = 7; // Número de ventas por página

  const ventas: Venta[] = [
    { numeroVenta: 1, fechaRegistro: '28/08/2024', tipoPago: 'Efectivo', total: 327 },
    { numeroVenta: 2, fechaRegistro: '28/08/2024', tipoPago: 'Tarjeta', total: 430 },
    { numeroVenta: 3, fechaRegistro: '29/08/2024', tipoPago: 'Efectivo', total: 215 },
    { numeroVenta: 4, fechaRegistro: '29/08/2024', tipoPago: 'Tarjeta', total: 500 },
    { numeroVenta: 5, fechaRegistro: '30/08/2024', tipoPago: 'Efectivo', total: 320 },
    { numeroVenta: 6, fechaRegistro: '30/08/2024', tipoPago: 'Tarjeta', total: 450 },
    { numeroVenta: 7, fechaRegistro: '30/08/2024', tipoPago: 'Tarjeta', total: 450 },
    { numeroVenta: 8, fechaRegistro: '30/08/2024', tipoPago: 'Tarjeta', total: 450 },
  ];

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
      <div className="container mx-auto min-h-screen h-screen flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Detalle de ventas</h1>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Exportar PDF
          </button>
        </div>

        <VentasTable
          ventas={ventas}
          currentPage={currentPage}
          ventasPerPage={ventasPerPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </div>
    </Layout>
  );
};

export default VentasHome;
