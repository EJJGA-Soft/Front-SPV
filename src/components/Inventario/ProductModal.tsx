
interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ onClose }) => {
    return (
        <>
            <div
                tabIndex={-1}
                aria-hidden="true"
                className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">Agregar producto</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8 flex items-center justify-center"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            <span className="sr-only">Cerrar modal</span>
                        </button>
                    </div>

                    <form className="p-4 space-y-4">

                        <div className="border-2 border-dashed rounded border-gray-300 p-6 text-center mb-4 relative">
                            <div className="flex justify-center my-2">
                                <img
                                    src="src/assets/icons/cloud-upload-svgrepo-com.png" 
                                    alt="Icono de subida"
                                    className="w-12 h-12" 
                                />
                            </div>
                            <p className="text-gray-600 font-semibold">Click para subir o arrastra y suelta</p>
                            <p className="text-gray-600 font-semibold">PNG, JPG</p>
                            <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer">
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="hidden"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita que el evento se propague fuera del contenedor
                                    }}
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Stock
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                type="number"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Nombre
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Precio
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                type="number"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Categoría
                            </label>
                            <select
                                name="rol"
                                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                            >
                                <option value="">Selecciona una categoría</option>
                                <option value="admin">Bebidas</option>
                                <option value="user">Frutas y verduras</option>
                                <option value="user">Leguminosas</option>
                            </select>
                        </div>

                        <div className="flex justify-center space-x-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-600 font-semibold bg-gray-200 hover:bg-gray-300 rounded-lg px-5 py-2.5"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="text-white font-semibold bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default ProductModal;