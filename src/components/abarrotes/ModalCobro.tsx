import React, { useState } from "react";
import { FaCashRegister, FaCreditCard } from "react-icons/fa";

interface CobroModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCuenta:number;
}

const CobroModal: React.FC<CobroModalProps> = ({ isOpen, onClose, totalCuenta }) => {
  const [amountEfectivo, setAmountEfectivo] = useState<string>("0");
  const [amountTarjeta, setAmountTarjeta] = useState<string>("0");
  const [paymentType, setPaymentType] = useState<string>("efectivo");

  if (!isOpen) return null;

  const handleEfectivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountEfectivo(e.target.value);
  };

  const handleTarjetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountTarjeta(e.target.value);
  };

  const handlePaymentTypeChange = (type: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPaymentType(type);
  };
  const totalIngresado =
  parseFloat(amountEfectivo || "0") + parseFloat(amountTarjeta || "0");
const cambio = totalIngresado - totalCuenta;

  return (
    <div
      id="cobro-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">Cobrar cuenta</h3>
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

        <form className="p-4">
          <div className="grid gap-4 mb-4">
            <div className="flex justify-center space-x-6">
              <button
                type="button"
                onClick={(e) => handlePaymentTypeChange("efectivo", e)}
                className={`${
                  paymentType === "efectivo" ? "bg-green-600" : "bg-green-500"
                } text-white px-6 py-3 rounded-lg flex items-center space-x-3 focus:outline-none hover:bg-green-400`}
              >
                <FaCashRegister />
                <span>Efectivo</span>
              </button>

              <button
                type="button"
                onClick={(e) => handlePaymentTypeChange("tarjeta", e)}
                className={`${
                  paymentType === "tarjeta" ? "bg-red-600" : "bg-red-500"
                } text-white px-6 py-3 rounded-lg flex items-center space-x-3 focus:outline-none hover:bg-red-400`}
              >
                <FaCreditCard />
                <span>Tarjeta</span>
              </button>
            </div>

            {/* Contenedor de dos columnas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="efectivo"
                  className="block text-sm font-medium text-gray-900"
                >
                  Monto en efectivo
                </label>
                <input
                  type="number"
                  id="efectivo"
                  value={amountEfectivo}
                  onChange={handleEfectivoChange}
                  placeholder="Monto en efectivo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 mt-2"
                />
              </div>

              <div>
                <label
                  htmlFor="tarjeta"
                  className="block text-sm font-medium text-gray-900"
                >
                  Monto con tarjeta
                </label>
                <input
                  type="number"
                  id="tarjeta"
                  value={amountTarjeta}
                  onChange={handleTarjetaChange}
                  placeholder="Monto con tarjeta"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 mt-2"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-100 rounded mb-4">
            <p> 
             Total de la cuenta:{" "}
            <span className="font-semibold">${totalCuenta.toFixed(2)}</span>
            </p>
            <p>
              Total ingresado:{" "}
              <span className="font-semibold">
              ${totalIngresado.toFixed(2)}
            </span>
            </p>
            <p>
              Cambio:{" "}
              <span className="font-semibold">
              {cambio >= 0 ? `$${cambio.toFixed(2)}` : "$0.00"}
            </span>
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CobroModal;
