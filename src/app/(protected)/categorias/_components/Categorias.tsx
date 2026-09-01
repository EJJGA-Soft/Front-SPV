'use client'
import { useState } from "react";
import CategoriesTable from "./CategoriesTable";
import Layout from "@/components/layout/layout";
import CategoriesModal from "./CategoriesModal";
import { UserStore } from "@/global/userStore";

const Categorias = () => {
  const [isAddCategoriesModalOpen, setIsAddCategoriesModalOpen] = useState(false);
  const [reload, setReload] = useState<boolean>(false);
  const { rol } = UserStore();

  const handleOpenAddCategoriesModal = () => {
    setIsAddCategoriesModalOpen(true);
  };

  const handleCloseAddCategoriesModal = () => {
    setIsAddCategoriesModalOpen(false);
  };

  const UpdateCategory = () => {
    setReload(true);
  };

  return (
    <>
      <Layout>
        <div className="mx-auto flex flex-col px-4 sm:px-1 py-4 md:mt-[-50px]">
          <div className="flex justify-between items-center mb-4 mt-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-base sm:text-lg">
              Categorias
            </h1>
            {rol !== "Empleado" && (
              <button
                onClick={handleOpenAddCategoriesModal}
                className="font-semibold px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-base"
              >
                Agregar categoria
              </button>
            )}

            {isAddCategoriesModalOpen && (
              <CategoriesModal
                isOpen={isAddCategoriesModalOpen}
                onClose={handleCloseAddCategoriesModal}
                onSave={UpdateCategory}
              />
            )}
          </div>

          <CategoriesTable reload={reload} setReload={setReload} />
        </div>
      </Layout>
    </>
  );
};

export default Categorias;
