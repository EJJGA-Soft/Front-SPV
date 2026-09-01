'use client'
import { useState } from "react";
import Layout from "@/components/layout/layout";
import ProveedoresTable from "./ProveedoresTable";
import ModalProveedores from "./ModalProveedores";
import { IProveedores } from "@/interfaces/Proveedores/proveedor_interface";
import BaseService from "@/services/base_service";
import { UserStore } from "@/global/userStore";

const baseService = new BaseService();

const ProveedoresHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState<boolean>(false);
  const { rol } = UserStore();

  const getProveedores = async () => {
    await baseService.Get<IProveedores>("/Proveedor");
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = () => {
    setReload(true);
    getProveedores();
  };

  return (
    <>
      <Layout>
        <div className="mx-auto flex flex-col px-4 sm:px-1 py-4 md:mt-[-50px]">
          <div className="flex justify-between items-center mb-4 mt-6">
            <h1 className="text-2xl sm:text-3xl font-semibold">Proveedores</h1>
            {rol !== "Empleado" && (
              <button
                onClick={handleOpenModal}
                className="font-semibold px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-base"
              >
                Agregar proveedor
              </button>
            )}
          </div>

          <ProveedoresTable reload={reload} setReload={setReload} />

          {isModalOpen && (
            <ModalProveedores
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSave={handleSave}
            />
          )}
        </div>
      </Layout>
    </>
  );
};

export default ProveedoresHome;
