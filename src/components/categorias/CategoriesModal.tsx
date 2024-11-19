
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
                <div className="relative p-4 w-full max-w-xs sm:max-w-md bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-3 border-b">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Agregar Categoria</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:bg-gray-200 rounded-lg w-6 h-6 flex items-center justify-center"
                        >
                            <svg
                                className="w-4 h-4"
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

                    <form className="p-3 space-y-3">

                       

                    
                        <div>
                            <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-900">
                                Nombre
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-xs sm:text-sm rounded-lg block w-full p-2.5"
                                required
                            />
                        </div>


                       

                        <div className="flex justify-center space-x-4 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-600 font-semibold bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 text-xs sm:text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="text-white font-semibold bg-blue-700 hover:bg-blue-800 rounded-lg px-4 py-2 text-xs sm:text-sm"
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