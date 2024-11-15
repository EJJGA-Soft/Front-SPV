import React, { useState } from 'react';
import Layout from '../../../components/layout/layout';
import Logotipo from '../../../assets/images/LOGO.svg';
import { Link } from 'react-router-dom';
import ModalCorte from '../../../components/abarrotes/ModalCorte'; 
import { AiOutlineShoppingCart, AiOutlineLineChart, AiOutlineCheckCircle } from 'react-icons/ai';

const AbarrotesHome: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 px-4 py-10">
        <div className="mb-6">
          <img src={Logotipo} alt="Logotipo" className="w-36 h-36" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl mt-20">
          <Link to="/registro-venta">
            <div className="w-full sm:w-64 h-34 p-6 bg-white border border-blue-500 rounded-lg shadow-lg text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-blue-100 flex flex-col justify-center items-center">
              <AiOutlineShoppingCart className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-blue-500">Registrar Venta</h3>
            </div>
          </Link>

          <div
            className="w-full sm:w-64 h-34 p-6 bg-white border border-yellow-500 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-yellow-100 cursor-pointer flex flex-col justify-center items-center"
            onClick={openModal}
          >
            <AiOutlineCheckCircle className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-yellow-500">Corte de Caja</h3>
          </div>

          <Link to="/historialventas">
            <div className="w-full sm:w-64 h-34 p-6 bg-white border border-purple-500 rounded-lg shadow-lg text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-purple-100 flex flex-col justify-center items-center">
              <AiOutlineLineChart className="text-4xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-purple-500">Detalle de Ventas</h3>
            </div>
          </Link>
        </div>
      </div>

      <ModalCorte
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </Layout>
  );
};

export default AbarrotesHome;
