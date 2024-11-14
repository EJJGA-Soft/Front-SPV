import React, { useState } from "react";
import CobroModal from "./cobromodal";
import Layout from "../layout/layout";

const Compras: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCobrarClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Layout>
    <div className="flex justify-between p-4 bg-gray-100 h-screen">
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4">Venta 1</h1>
        <p className="mb-2">Usuario: User1</p>
        <p className="mb-6 text-xl font-bold">Total: $170.00</p>

        {/* Tabla de productos en el carrito */}
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border-r border-gray-300">Cantidad</th>
              <th className="p-2 border-r border-gray-300">Nombre del producto</th>
              <th className="p-2">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-center border-r border-gray-300">1</td>
              <td className="p-2 border-r border-gray-300">Sabritas adobadas</td>
              <td className="p-2 text-right">$22.00</td>
            </tr>
            <tr>
              <td className="p-2 text-center border-r border-gray-300">4</td>
              <td className="p-2 border-r border-gray-300">Azúcar morena 1kg</td>
              <td className="p-2 text-right">$37.00</td>
            </tr>
          </tbody>
        </table>

        <div className="flex items-center justify-center mt-6 space-x-4">
          <button className="bg-red-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
            -
          </button>
          <button className="bg-blue-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
            +
          </button>
        </div>

        {/* Botón de Cobrar */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleCobrarClick}
            className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
          >
            <span>Cobrar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Productos</h2>

        <select className="w-full mb-6 p-2 border border-gray-300 rounded">
          <option>Seleccione una categoría</option>
          <option>Categoría 1</option>
          <option>Categoría 2</option>
        </select>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Producto"
              className="h-24 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      <CobroModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
    </Layout>
    </>
  );
};

export default Compras;
