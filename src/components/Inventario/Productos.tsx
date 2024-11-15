import Layout from "../layout/layout";

const Productos = () => {
  return (
    <>
      <Layout>

        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <div className="p-4">
            
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
                  <p className="text-lg mt-2">350</p>
                </div>
                <div className="border-l border-gray-300" />
                <div className="text-center">
                  <a href="#" className="text-purple-600 font-semibold">
                    Los más vendidos
                  </a>
                  <p className="text-lg mt-2">14</p>
                </div>
                <div className="border-l border-gray-300" />
                <div className="text-center">
                  <a href="#" className="text-red-600 font-semibold">
                    Productos por agotarse
                  </a>
                  <p className="text-lg mt-2">14</p>
                </div>
              </div>
            </div>

            {/* TABLA */}
            <div className="flex justify-between items-center mb-4 py-6">
              <h1 className="text-2xl font-bold">Productos</h1>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Agregar producto
              </button>
            </div>

            <div style={{ flexGrow: 1, overflowY: "auto" }}>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-center">Stock</th>
                    <th className="py-3 px-6 text-center">Imagen</th>
                    <th className="py-3 px-6 text-center">Nombre</th>
                    <th className="py-3 px-6 text-center">Precio</th>
                    <th className="py-3 px-6 text-center">Categoria</th>
                    <th className="py-3 px-6 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">

                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-center">15</td>
                    <td className="py-3 px-6 text-center">
                      <img
                        alt="Imagen de Frijol 1kg"
                        height={50}
                        src="https://storage.googleapis.com/a1aa/image/ytf829Yj7NRlIqxhx8zdPeVzvA7238ffJaEOQ1ssNH9NrRDPB.jpg"
                        width={50}
                        className="mx-auto"
                      />
                    </td>
                    <td className="py-3 px-6 text-center">Frijol</td>
                    <td className="py-3 px-6 text-center">$32.00</td>
                    <td className="py-3 px-6 text-center">Leguminosas</td>
                    <td className="py-2 px-4 border-b text-center">
                      <button className="text-green-500">
                        <img
                          src="src/assets/icons/edit_8524450.png"
                          alt="Editar"
                          className="h-7 w-7 mr-1"
                        />
                      </button>

                      <button className="text-red-500 ml-2">
                        <img
                          src="src/assets/icons/square_14034334.png"
                          alt="Eliminar"
                          className="h-7 w-7 mr-1"
                        />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>



            {/* Paginacion */}
            <div className="flex justify-between items-center py-8">
              <button className="border bg-white border-gray-300 rounded px-4 py-2 font-medium">
                Antes
              </button>
              <span className="text-gray-700 font-normal">Página 1 de 10</span>
              <button className="border bg-white border-gray-300 rounded px-4 py-2 font-medium">
                Siguiente
              </button>
            </div>
          </div>
        </div>

      </Layout>
    </>
  );
};

export default Productos;
