import ProductsTable from "../../../components/Inventario/ProductsTable";
import Layout from "../../../components/layout/layout";

const Inventario = () => {
    return (
        <>
            <Layout>
                <div className="container mx-auto min-h-screen h-screen flex flex-col px-4">

                    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto">
                        <h2 className="text-center text-xl font-semibold mb-4">
                            Inventario General
                        </h2>
                        <div className="flex justify-around">
                            <div className="text-center">
                                <a href="#" className="text-blue-600 font-semibold">
                                    Categorías
                                </a>
                                <p className="text-lg mt-2 font-semibold">14</p>
                            </div>
                            <div className="border-l border-gray-300" />
                            <div className="text-center">
                                <a href="#" className="text-orange-600 font-semibold">
                                    Total de productos
                                </a>
                                <p className="text-lg mt-2 font-semibold">350</p>
                            </div>
                            <div className="border-l border-gray-300" />
                            <div className="text-center">
                                <a href="#" className="text-purple-600 font-semibold">
                                    Los más vendidos
                                </a>
                                <p className="text-lg mt-2 font-semibold">14</p>
                            </div>
                            <div className="border-l border-gray-300" />
                            <div className="text-center">
                                <a href="#" className="text-red-600 font-semibold">
                                    Productos por agotarse
                                </a>
                                <p className="text-lg mt-2 font-semibold">14</p>
                            </div>
                        </div>
                    </div>

                    {/* TABLA */}
                    <div className="flex justify-between items-center mb-4 pt-6">
                        <h1 className="text-2xl font-bold">Productos</h1>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Agregar producto
                        </button>
                    </div>

                    <ProductsTable></ProductsTable>

                </div>
            </Layout>
        </>
    )
}

export default Inventario;