import React, { useState } from "react";
import { FaCashRegister, FaCreditCard } from "react-icons/fa"; // Iconos de efectivo y tarjeta

interface CobroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CobroModal: React.FC<CobroModalProps> = ({ isOpen, onClose }) => {
  const [paymentType, setPaymentType] = useState<string>("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Cobrar cuenta</h2>
        <p className="text-center mb-4">Número de venta: 1</p>

        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setPaymentType("efectivo")}
            className={`${
              paymentType === "efectivo" ? "bg-green-600" : "bg-green-500"
            } text-white px-4 py-2 rounded-lg flex items-center space-x-2 focus:outline-none hover:bg-green-400`}
          >
            <FaCashRegister />
            <span>Efectivo</span>
          </button>
          <button
            onClick={() => setPaymentType("tarjeta")}
            className={`${
              paymentType === "tarjeta" ? "bg-red-600" : "bg-red-500"
            } text-white px-4 py-2 rounded-lg flex items-center space-x-2 focus:outline-none hover:bg-red-400`}
          >
            <FaCreditCard />
            <span>Tarjeta</span>
          </button>
        </div>

        <div className="flex flex-col space-y-2 mb-4">
          {paymentType === "efectivo" && (
            <input
              type="number"
              placeholder="Monto en efectivo"
              className="p-2 border border-gray-300 rounded"
            />
          )}
          {paymentType === "tarjeta" && (
            <input
              type="number"
              placeholder="Monto con tarjeta"
              className="p-2 border border-gray-300 rounded"
            />
          )}
        </div>

        <div className="p-4 bg-gray-100 rounded mb-4">
          <p>Total de la cuenta: $170.00</p>
          <p>Total ingresado: $0.00</p>
          <p>Cambio: $0.00</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => alert("Pago confirmado")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CobroModal;
