import { useState } from "react";
import CategoriesTable from "../../../components/categorias/CategoriesTable";
import Layout from "../../../components/layout/layout";
import CategoriesModal from "../../../components/categorias/CategoriesModal";

const Inventario = () => {

    //Modal
    const [isAddCategoriesModalOpen, setIsAddCategoriesModalOpen] = useState(false);

    // Funciones para manejar el modal de "Agregar Producto"
    const handleOpenAddCategoriesModal = () => {
        setIsAddCategoriesModalOpen(true);
    };

    const handleCloseAddCategoriesModal = () => {
        setIsAddCategoriesModalOpen(false);
    };


    return (
        <>
            <Layout>
                <div className="container mx-auto min-h-screen h-screen flex flex-col px-4 sm:px-1 py-4">

                    

                    {/* TABLA */}
                    <div className="flex justify-between items-center mb-4 mt-6">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-base sm:text-lg">
                            Categorias
                        </h1>
                        <button
                            onClick={handleOpenAddCategoriesModal}
                            className="font-semibold px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-base"
                        >
                            Agregar categoria
                        </button>
                        {isAddCategoriesModalOpen && (
                            <CategoriesModal isOpen={isAddCategoriesModalOpen} onClose={handleCloseAddCategoriesModal} />
                        )}
                    </div>



                    <CategoriesTable></CategoriesTable>

                </div>
            </Layout>
        </>
    )
}

export default Inventario;