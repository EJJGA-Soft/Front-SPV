import { useState } from "react";
import ProductsTable from "../../../components/Inventario/ProductsTable";
import Layout from "../../../components/layout/layout";
import ProductModal from "../../../components/Inventario/ProductModal";

const Inventario = () => {

    //Modal
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [reloadTable, setReloadTable] = useState<boolean>(false);    

    // Funciones para manejar el modal de "Agregar Producto"
    const handleOpenAddProductModal = () => {
        setIsAddProductModalOpen(true);
    };

    const handleCloseAddProductModal = () => {
        setIsAddProductModalOpen(false);
    };

    const handleReloadAddProductModal =() => {
        setReloadTable(true);
    }

    return (
        <>
            <Layout>
                <div className="flex flex-col px-4 sm:px-1 py-4">

                    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-3xl mx-auto sm:max-w-xl md:max-w-3xl">
                        <h2 className="text-center text-sm sm:text-base font-semibold mb-3 sm:mb-4">
                            Inventario General
                        </h2>
                        <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
                            {/* Categorías */}
                            <div className="text-center flex-1 min-w-[45%] sm:min-w-[80px]">
                                <a href="#" className="text-blue-600 font-medium text-xs sm:text-sm">
                                    Categorías
                                </a>
                                <p className="text-sm sm:text-base mt-1 font-semibold">14</p>
                            </div>

                            {/* Divider */}
                            <div className="hidden sm:block border-l border-gray-300" />

                            {/* Total de productos */}
                            <div className="text-center flex-1 min-w-[45%] sm:min-w-[80px]">
                                <a href="#" className="text-orange-600 font-medium text-xs sm:text-sm">
                                    Total de productos
                                </a>
                                <p className="text-sm sm:text-base mt-1 font-semibold">350</p>
                            </div>

                            {/* Divider */}
                            <div className="hidden sm:block border-l border-gray-300" />

                            {/* Los más vendidos */}
                            <div className="text-center flex-1 min-w-[45%] sm:min-w-[80px]">
                                <a href="#" className="text-purple-600 font-medium text-xs sm:text-sm">
                                    Los más vendidos
                                </a>
                                <p className="text-sm sm:text-base mt-1 font-semibold">14</p>
                            </div>

                            {/* Divider */}
                            <div className="hidden sm:block border-l border-gray-300" />

                            {/* Productos por agotarse */}
                            <div className="text-center flex-1 min-w-[45%] sm:min-w-[80px]">
                                <a href="#" className="text-red-600 font-medium text-xs sm:text-sm">
                                    Productos por agotarse
                                </a>
                                <p className="text-sm sm:text-base mt-1 font-semibold">14</p>
                            </div>
                        </div>
                    </div>

                    {/* TABLA */}
                    <div className="flex justify-between items-center mb-4 mt-6">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-base sm:text-lg">
                            Productos
                        </h1>
                        <button
                            onClick={handleOpenAddProductModal}
                            className="font-semibold px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-base"
                        >
                            Agregar producto
                        </button>
                        {isAddProductModalOpen && (
                            <ProductModal
                            isOpen={isAddProductModalOpen}
                            onClose={handleCloseAddProductModal}
                            onReload={handleReloadAddProductModal}
                          />
                        )}
                    </div>

                    {/* Componente Tabla */}
                    <ProductsTable reload={reloadTable} setReload={setReloadTable} />
                </div>
            </Layout>
        </>
    )
}

export default Inventario;