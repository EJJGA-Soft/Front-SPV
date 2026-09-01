'use client'
import { useState } from "react";
import Layout from "@/components/layout/layout";
import UsuariosTable from "./UsuariosTable";
import UsuariosModal from "./UsuariosModal";

const UsuariosHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = () => {
    setReload(true);
  };

  return (
    <>
      <Layout>
        <div className="mx-auto flex flex-col px-4 sm:px-1 py-4 md:mt-[-50px]">
          <div className="flex justify-between items-center mb-4 mt-6">
            <h1 className="text-2xl sm:text-3xl font-semibold">Usuarios</h1>
            <button
              onClick={handleOpenModal}
              className="font-semibold px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-base"
            >
              Agregar usuario
            </button>
          </div>

          <UsuariosTable reload={reload} setReload={setReload} />

          {isModalOpen && (
            <UsuariosModal
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

export default UsuariosHome;
