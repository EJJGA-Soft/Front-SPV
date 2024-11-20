import React, { useState } from 'react';
import { HiEye } from 'react-icons/hi';
import ModalVentasDetalle from './ModalVentasDetalle';

interface Venta {
  numeroVenta: number;
  fechaRegistro: string;
  tipoPago: string;
  total: number;
}

interface VentasTableProps {
  ventas: Venta[];
  currentPage: number;
  ventasPerPage: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

const VentasTable: React.FC<VentasTableProps> = ({
  ventas,
  currentPage,
  ventasPerPage,
  handleNextPage,
  handlePrevPage,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<Venta | null>(null);

  const indexOfLastVenta = currentPage * ventasPerPage;
  const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
  const currentVentas = ventas.slice(indexOfFirstVenta, indexOfLastVenta);

  const emptyRows = ventasPerPage - currentVentas.length;

  const handleOpenModal = (venta: Venta) => {
    setVentaSeleccionada(venta);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setVentaSeleccionada(null);
  };

  return (
    <div className="w-full h-auto">
    <div className="overflow-x-auto">
    <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
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
              <tr key={venta.numeroVenta} className="border-t border-gray-200 text-center text-sm">
                <td className="p-4">{venta.numeroVenta}</td>
                <td className="p-4">{venta.fechaRegistro}</td>
                <td className="p-4">{venta.tipoPago}</td>
                <td className="p-4">${venta.total.toFixed(2)}</td>
                <td className="p-4 relative">
                  <button
                    onClick={() => handleOpenModal(venta)}
                    className="text-blue-500 hover:text-blue-700 relative group"
                    aria-label="Ver detalles"
                  >
                    <HiEye className="w-5 h-5" />
                    <span className="absolute bottom-full mb-1 hidden group-hover:flex justify-center items-center text-xs text-white bg-black px-2 py-1 rounded shadow-lg whitespace-nowrap bg-opacity-75">
                      Ver detalles
                    </span>
                  </button>
                </td>
              </tr>
            ))}

            {/* Filas vacías si no hay suficientes registros */}
            {emptyRows > 0 && Array.from({ length: emptyRows }).map((_, index) => (
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

      <div className="flex justify-between items-center">
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

      {/* Modal de detalles de venta */}
      {ventaSeleccionada && isModalOpen && (
        <ModalVentasDetalle
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          numeroVenta={ventaSeleccionada.numeroVenta}
          fechaRegistro={ventaSeleccionada.fechaRegistro}
          tipoPago={ventaSeleccionada.tipoPago}
          total={ventaSeleccionada.total}
          productos={[
            { nombre: "Producto 1", cantidad: 1, precio: 50, total: 50 },
            { nombre: "Producto 2", cantidad: 2, precio: 30, total: 60 },
           
          ]}
        />
      )}
    </div>
  );
};

export default VentasTable;
