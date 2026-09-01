'use client'
import React, { useState } from "react";
import { HiEye } from "react-icons/hi";
import ModalVentasDetalle from "./ModalVentasDetalle";
import { VentasTableProps } from "@/interfaces/Abarrotes/Ventas/VentasTableProps";
import { IVenta } from "@/interfaces/Abarrotes/Ventas/ventas_interface";
import LoadingTables from "@/components/loading/loadingtables";

const VentasTable: React.FC<VentasTableProps> = ({
  ventas,
  currentPage,
  ventasPerPage,
  handlePrevPage,
  isLoading,
  getUserById,
  usuarioNombre,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<IVenta | null>(
    null,
  );

  const indexOfLastVenta = currentPage * ventasPerPage;
  const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
  const currentVentas = ventas.slice(indexOfFirstVenta, indexOfLastVenta);
  const emptyRows = ventasPerPage - currentVentas.length;

  const handleOpenModal = async (venta: IVenta) => {
    setVentaSeleccionada(venta);
    setModalOpen(true);
    await getUserById(venta.usuarioId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setVentaSeleccionada(null);
  };

  const formatearFecha = (fecha: string) =>
    new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const getTipoPago = (tipo: number) => (tipo === 0 ? "EFECTIVO" : "TARJETA");

  return (
    <div className="w-full h-auto">
      <div className="overflow-x-auto">
        {isLoading ? (
          <LoadingTables />
        ) : ventas.length <= 0 ? (
          <div className="flex bg-white justify-center items-center h-80">
            <span className="text-gray-500 text-sm md:text-base lg:text-lg">
              No hay ventas disponibles.
            </span>
          </div>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-white text-gray-700 text-center">
                <th className="p-4 text-xs sm:text-base">ID Venta</th>
                <th className="p-4 text-xs sm:text-base">Fecha de registro</th>
                <th className="p-4 text-xs sm:text-base">Total</th>
                <th className="p-4 text-xs sm:text-base">Tipo de Pago</th>
                <th className="p-4 text-xs sm:text-base">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentVentas.map((venta) => (
                <tr
                  key={venta.id}
                  className="border-t border-gray-200 text-center text-sm"
                >
                  <td className="p-4">{venta.id}</td>
                  <td className="p-4">{formatearFecha(venta.fechaRegistro)}</td>
                  <td className="p-4">${venta.pago.toFixed(2)}</td>
                  <td className="p-4">{getTipoPago(venta.tipoPago)}</td>
                  <td className="p-4 flex justify-center">
                    <button
                      onClick={() => handleOpenModal(venta)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <HiEye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {emptyRows > 0 &&
                [...Array(emptyRows)].map((_, index) => (
                  <tr
                    key={`empty-${index}`}
                    className="border-t border-gray-200 text-center"
                  >
                    <td colSpan={5} className="p-4 text-center">
                      &nbsp;
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && ventaSeleccionada && (
        <ModalVentasDetalle
          ventaId={ventaSeleccionada.id}
          usuarioNombre={usuarioNombre}
          tipoPago={getTipoPago(ventaSeleccionada.tipoPago)}
          pagoTotal={ventaSeleccionada.pago}
          fechaVenta={formatearFecha(ventaSeleccionada.fechaRegistro)}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default VentasTable;
