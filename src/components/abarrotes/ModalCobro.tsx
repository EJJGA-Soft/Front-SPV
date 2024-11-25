import React, { useState } from "react";
import { FaCashRegister, FaCreditCard } from "react-icons/fa";
import { Producto } from "../../interfaces/Inventario/producto_interface";
import axios from "axios";
import { Api_Connection } from "../../modules/services/API/api_connection";
import { UserStore } from "../../security/store/userStore";
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { FiX } from "react-icons/fi";


interface CobroModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCuenta:number;
  productos: Producto[];
}

const CobroModal: React.FC<CobroModalProps> = ({ isOpen, onClose, totalCuenta, productos, resetCarrito, actualizarNumeroVenta   }) => {
  const [amountEfectivo, setAmountEfectivo] = useState<string>("0");
  const [amountTarjeta, setAmountTarjeta] = useState<string>("0");
  const [paymentType, setPaymentType] = useState<string>("efectivo");
  const [carrito, setCarrito] = useState<Producto[]>([]);

  const {id} = UserStore();
  const {enqueueSnackbar} = useSnackbar();

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

    if(type === "efectivo"){
      setAmountTarjeta("0");
    } else{
      setAmountEfectivo("0");
    }
  };

  const totalIngresado = parseFloat(amountEfectivo || "0") + parseFloat(amountTarjeta || "0");
const cambio = totalIngresado - totalCuenta;


const handleConfirmar = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!productos || productos.length === 0) {
    enqueueSnackbar("No hay productos para registrar la venta.", { variant: "error" });
    return;
  }
  if (totalIngresado < totalCuenta) {
    enqueueSnackbar("El monto ingresado es insuficiente.", { variant: "error" });
    return;
  }

  const productosVendidos = productos.map((item) => ({
    id: item.producto.id,
    esBorrado: false,
    nombre: item.producto.nombre,
    precio: item.producto.precio,
    stock: item.cantidad, 
    urlImagen: item.producto.urlImagen,
    categoriaId: item.producto.categoriaId,
    proveedorId: item.producto.proveedorId,
  }));

  const url = `${Api_Connection()}VentaProducto/ShoppingCartProducts?tipoPago=${paymentType}&uid=${id}`;

  try {
    const response = await axios.post(url, productosVendidos, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      enqueueSnackbar("Venta registrada con éxito!", { variant: "success" });
      actualizarNumeroVenta((prevNumeroVenta) => prevNumeroVenta + 1);
      resetCarrito();
      onClose();
    } else {
      enqueueSnackbar("Hubo un error al registrar la venta. Intenta nuevamente.", { variant: "error" });
    }
  } catch (error) {
    console.error("Error en la solicitud:", error.response || error.message);
    enqueueSnackbar(
      error.response?.data?.message || "Error en la conexión. Intenta nuevamente.",
      { variant: "error" }
    );
  }
};




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
          <FiX className="text-2xl" />
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
                  paymentType === "efectivo" ? "bg-green-600" : "bg-gray-400"
                } text-white px-6 py-3 rounded-lg flex items-center space-x-3 focus:outline-none hover:bg-green-400`}
              >
                <FaCashRegister />
                <span>Efectivo</span>
              </button>

              <button
                type="button"
                onClick={(e) => handlePaymentTypeChange("tarjeta", e)}
                className={`${
                  paymentType === "tarjeta" ? "bg-red-600" : "bg-gray-400"
                } text-white px-6 py-3 rounded-lg flex items-center space-x-3 focus:outline-none hover:bg-red-400`}
              >
                <FaCreditCard />
                <span>Tarjeta</span>
              </button>
            </div>

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
                  disabled={paymentType === "tarjeta"}
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
                  disabled={paymentType === "efectivo"}
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
              onClick={handleConfirmar}
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
