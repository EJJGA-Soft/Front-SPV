import React, { useState } from "react";
import Layout from "../../../components/layout/layout";
import { Link } from "react-router-dom";
import ModalCorte from "../../../components/abarrotes/ModalCorte";
import {
  AiOutlineShoppingCart,
  AiOutlineLineChart,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { UserStore } from "../../../security/store/userStore";

const AbarrotesHome: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { rol } = UserStore();

  const cards = [
    {
      key: "venta",
      visible: true,
      component: (
        <Link to="/registro-venta" key="venta">
          <div className="flex flex-col items-center justify-center w-64 h-40 bg-white border border-blue-500 rounded-lg shadow-lg text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-blue-100">
            <AiOutlineShoppingCart className="text-3xl sm:text-4xl text-blue-500 mb-3" />
            <h3 className="text-lg sm:text-xl font-semibold text-blue-500">
              Registrar Venta
            </h3>
          </div>
        </Link>
      ),
    },
    {
      key: "corte",
      visible: rol !== "Empleado",
      component: (
        <div
          key="corte"
          className="flex flex-col items-center justify-center w-64 h-40 bg-white border border-yellow-500 rounded-lg shadow-lg text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-yellow-100"
          onClick={openModal}
        >
          <AiOutlineCheckCircle className="text-3xl sm:text-4xl text-yellow-500 mb-3" />
          <h3 className="text-lg sm:text-xl font-semibold text-yellow-500">
            Corte de Caja
          </h3>
        </div>
      ),
    },
    {
      key: "detalle",
      visible: rol !== "Empleado",
      component: (
        <Link to="/detalle-ventas" key="detalle">
          <div className="flex flex-col items-center justify-center w-64 h-40 bg-white border border-purple-500 rounded-lg shadow-lg text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-purple-100">
            <AiOutlineLineChart className="text-3xl sm:text-4xl text-purple-500 mb-3" />
            <h3 className="text-lg sm:text-xl font-semibold text-purple-500">
              Detalle de Ventas
            </h3>
          </div>
        </Link>
      ),
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center bg-gray-100 md:mt-[-30px] sm:py-10 px-6 pt-10 pb-[140px]">
        <div className="mb-8 sm:mb-12">
          <img
            src="/LOGO.svg"
            alt="Logotipo"
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl mt-10 sm:mt-16">
          {cards.filter((card) => card.visible).map((card) => card.component)}
        </div>
      </div>

      <ModalCorte isOpen={isModalOpen} onClose={closeModal} />
    </Layout>
  );
};

export default AbarrotesHome;
