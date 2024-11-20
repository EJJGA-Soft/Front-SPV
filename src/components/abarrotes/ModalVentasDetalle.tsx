import React from "react";

interface DetalleVentaModalProps {
  isOpen: boolean;
  onClose: () => void;
  numeroVenta: number;
  fechaRegistro: string;
  tipoPago: string;
  total: number;
  usuario: string;
  productos: {
    nombre: string;
    cantidad: number;
    precio: number;
    total: number;
  }[];
}

const ModalVentasDetalle: React.FC<DetalleVentaModalProps> = ({
  isOpen,
  onClose,
  numeroVenta,
  fechaRegistro,
  tipoPago,
  total,
  usuario,
  productos,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-6 w-full max-w-2xl bg-white rounded-lg shadow-lg"> 
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">Detalle de venta</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7L1 1m6 6l6-6"
              />
            </svg>
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>

        <div className="p-4">
         
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Usuario que realizó la venta</label>
            <p className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-start">José Martínez</p>
          </div>

          <div className="flex flex-wrap gap-4 mb-4"> 
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900">Fecha de registro</label>
              <p className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-center">{fechaRegistro}</p>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900">Número de venta</label>
              <p className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-center">{numeroVenta}</p>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900">Tipo de pago</label>
              <p className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-center">{tipoPago}</p>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900">Total</label>
              <p className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-center">${total.toFixed(2)}</p>
            </div>
          </div>

          <h4 className="text-md font-semibold mb-2">Lista de productos</h4>
          <table className="w-full text-sm text-left text-gray-500 border border-gray-300"> 
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-4 py-2">Nombre del producto</th>
                <th scope="col" className="px-4 py-2">Cantidad</th>
                <th scope="col" className="px-4 py-2">Precio</th>
                <th scope="col" className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2">{producto.nombre}</td>
                  <td className="px-4 py-2 text-center">{producto.cantidad}</td>
                  <td className="px-4 py-2 text-right">${producto.precio.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">${producto.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
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
