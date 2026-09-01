'use client'
import React, { useEffect, useState } from "react";
import { IVentaProducto } from "@/interfaces/Abarrotes/Ventas/venta_producto_interface";
import { IProducto } from "@/interfaces/Abarrotes/Ventas/producto_interface";
import BaseService from "@/services/base_service";
import { Api_Connection } from "@/services/API/api_connection";
import { ModalVentasDetalleProps } from "@/interfaces/Abarrotes/Ventas/ModalVentaDetalleProps";
import { FiX } from "react-icons/fi";

const ModalVentasDetalle: React.FC<ModalVentasDetalleProps> = ({
  ventaId,
  usuarioNombre,
  tipoPago,
  pagoTotal,
  fechaVenta,
  closeModal,
}) => {
  const [ventaProductos, setVentaProductos] = useState<
    (IVentaProducto & { nombre?: string; precio?: number })[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const baseService = new BaseService();

  const obtenerInfoProducto = async (
    produtoId: number,
    precioUnitario: number,
  ): Promise<IProducto | null> => {
    try {
      const response = await baseService.GetSimple<IProducto>(
        `${Api_Connection()}Productos/${produtoId}`,
      );
      const results = response.data as IProducto;
      results.precio = precioUnitario;

      return results;
    } catch (error) {
      console.error("Error al realizar la solicitud de produto:", error);
      return null;
    }
  };

  const obtenerProductosVenta = async () => {
    setIsLoading(true);
    const response = await baseService.Get<IVentaProducto>(
      `${Api_Connection()}VentaProducto`,
    );
    if (response.success) {
      const data = response.data as IVentaProducto[];
      const produtosConDetalles = await Promise.all(
        data
          .filter((vp) => vp.ventaId === ventaId)
          .map(async (produto) => ({
            ...produto,
            ...(await obtenerInfoProducto(produto.productoId, produto.precioUnitario)),
          })),
      );
      setVentaProductos(produtosConDetalles);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    obtenerProductosVenta();
  }, [ventaId]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">
            Detalle de venta
          </h3>
          <button
            type="button"
            onClick={closeModal}
            className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm inline-flex justify-center items-center"
          >
            <FiX className="text-2xl" />
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Usuario que realizÃ³ la venta
            </label>
            <p className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-start">
              {usuarioNombre || "Desconocido"}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900">
                Fecha de registro
              </label>
              <p className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-center">
                {fechaVenta}
              </p>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900">
                Tipo de pago
              </label>
              <p className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-center">
                {tipoPago || "No especificado"}
              </p>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900">
                Total
              </label>
              <p className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-center">
                ${pagoTotal?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>

          <h4 className="text-md font-semibold mb-2">Lista de produtos</h4>
          {isLoading ? (
            <p>Cargando detalles...</p>
          ) : ventaProductos.length === 0 ? (
            <p>No se encontraron produtos para esta venta.</p>
          ) : (
            <div className="overflow-x-auto max-h-80">
              <table className="w-full text-sm text-center text-gray-500 border border-gray-300">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="px-4 py-2">
                      Nombre del produto
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Cantidad
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Precio
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ventaProductos.map((produto, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="px-4 py-2">{produto.nombre}</td>
                      <td className="px-4 py-2 text-center">
                        {produto.stockVendido}
                      </td>
                      <td className="px-4 py-2 text-right">
                        ${produto.precio?.toFixed(2) || "N/A"}
                      </td>
                      <td className="px-4 py-2 text-right">
                        ${(produto.precio! * produto.stockVendido).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalVentasDetalle;
