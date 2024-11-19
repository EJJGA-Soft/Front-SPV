import { useState, useEffect } from "react";
import ProductsTable from "../../../components/Inventario/ProductsTable";
import Layout from "../../../components/layout/layout";
import ProductModal from "../../../components/Inventario/ProductModal";
import { Producto } from "../../../interfaces/Inventario/producto_interface";
import inventoryService from "../../services/Inventario/InventoryService";
import LoadingView from "../../../components/loading/loading";

const Inventario = () => {

    // Estado para manejar la lista de productos
    const [productos, setProductos] = useState<Producto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productosPerPage = 10;

    const Productos = new inventoryService();

    //Modal
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

    // Funciones para manejar el modal de "Agregar Producto"
    const handleOpenAddProductModal = () => {
        setIsAddProductModalOpen(true);
    };

    const handleCloseAddProductModal = () => {
        setIsAddProductModalOpen(false);
    };

    async function getProductos(): Promise<Producto[]> {
        setIsLoading(true);

        try {
            const response = await Productos.getProducts();

            if (response.success) {
                const convert = response.data as Producto[];
                setProductos(convert);
                setIsLoading(false);
                return convert;
            }
            return [];
        } catch (error) {
            console.error("Error al obtener productos:", error);
            throw error;
        }
    }

    useEffect(() => {
        getProductos()
    }, [])

    const handleNextPage = () => {
        if (currentPage * productosPerPage < productos.length) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };


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
                            <ProductModal isOpen={isAddProductModalOpen} onClose={handleCloseAddProductModal} />
                        )}
                    </div>

                    {isLoading ? (
                        <LoadingView />
                    ) : (

                        <ProductsTable
                            productos={productos}
                            currentPage={currentPage}
                            productosPerPage={productosPerPage}
                            handleNextPage={handleNextPage}
                            handlePrevPage={handlePrevPage}
                        />
                    )}

                    {/* Paginacion */}
                    <div className="flex justify-between items-center mt-6 flex-wrap">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-base"
                        >
                            Antes
                        </button>

                        <span className="text-gray-700 text-xs sm:text-base">Página {currentPage} de  {Math.ceil(productos.length / productosPerPage)}</span>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage * productosPerPage >= productos.length}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-base"
                        >
                            Siguiente
                        </button>
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default Inventario;