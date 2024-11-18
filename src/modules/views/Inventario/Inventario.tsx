import { useState } from "react";
import ProductsTable from "../../../components/Inventario/ProductsTable";
import Layout from "../../../components/layout/layout";
import ProductModal from "../../../components/Inventario/ProductModal";

const Inventario = () => {

    //Modal
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

    // Funciones para manejar el modal de "Agregar Producto"
    const handleOpenAddProductModal = () => {
        setIsAddProductModalOpen(true);
    };

    const handleCloseAddProductModal = () => {
        setIsAddProductModalOpen(false);
    };


    return (
        <>
            <Layout>
                <div className="container mx-auto min-h-screen h-screen flex flex-col px-4">

                    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-3xl mx-auto">
                        <h2 className="text-center text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                            Inventario General
                        </h2>
                        <div className="flex flex-wrap justify-between gap-3 sm:gap-4 md:justify-around md:flex-nowrap">
                            <div className="text-center flex-1 min-w-[100px]">
                                <a href="#" className="text-blue-600 font-semibold text-sm sm:text-base">
                                    Categorías
                                </a>
                                <p className="text-base sm:text-lg mt-1 sm:mt-2 font-semibold">14</p>
                            </div>
                            <div className="hidden md:block border-l border-gray-300" />
                            <div className="text-center flex-1 min-w-[100px]">
                                <a href="#" className="text-orange-600 font-semibold text-sm sm:text-base">
                                    Total de productos
                                </a>
                                <p className="text-base sm:text-lg mt-1 sm:mt-2 font-semibold">350</p>
                            </div>
                            <div className="hidden md:block border-l border-gray-300" />
                            <div className="text-center flex-1 min-w-[100px]">
                                <a href="#" className="text-purple-600 font-semibold text-sm sm:text-base">
                                    Los más vendidos
                                </a>
                                <p className="text-base sm:text-lg mt-1 sm:mt-2 font-semibold">14</p>
                            </div>
                            <div className="hidden md:block border-l border-gray-300" />
                            <div className="text-center flex-1 min-w-[100px]">
                                <a href="#" className="text-red-600 font-semibold text-sm sm:text-base">
                                    Productos por agotarse
                                </a>
                                <p className="text-base sm:text-lg mt-1 sm:mt-2 font-semibold">14</p>
                            </div>
                        </div>
                    </div>


                    {/* TABLA */}
                    <div className="flex justify-between items-center mb-4 mt-6">
                        <h1 className="text-2xl font-semibold">Productos</h1>
                        <button
                            onClick={handleOpenAddProductModal}
                            className="font-semibold px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-base">
                            Agregar producto
                        </button>
                        {isAddProductModalOpen && (
                            <ProductModal isOpen={isAddProductModalOpen} onClose={handleCloseAddProductModal} />
                        )}
                    </div>


                    <ProductsTable></ProductsTable>

                </div>
            </Layout>
        </>
    )
}

export default Inventario;