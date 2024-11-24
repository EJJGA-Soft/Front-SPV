import { useState, useEffect } from "react";
import { ICategoria } from "../../interfaces/Inventario/categoria_interface";
import BaseService from "../../modules/services/base_service";
import { FiX } from "react-icons/fi";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  itemEntity: ICategoria;
}

const baseService = new BaseService();
const CategoriesEditModal: React.FC<ProductModalProps> = ({ onClose, onSave, itemEntity }) => {
  const [category, setCategory] = useState<ICategoria>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    setCategory(itemEntity);
  }, [itemEntity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: name === "nombre" ? value : value.trim(),
    }));
  };

  const OnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (category?.nombre?.trim() === "" || category?.nombre === undefined) {
      setError("La categoria no puede estar vacia");
    } else {
      const response = await baseService.Put(`/Categorias/${category.id}`, category);
      if (response.success) {
        onClose();
        onSave();
      } else {
        setError(response.message);
      }
    }
  };

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-xs sm:max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Editar Categoria
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 rounded-lg w-6 h-6 flex items-center justify-center"
          >
          <FiX className="text-2xl" />
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>

        <form className="p-3 space-y-3" onSubmit={OnSubmit}>
          <div>
            <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-900">
              Nombre
            </label>
            <input
              name="nombre"
              value={category?.nombre || ""}
              className="bg-gray-50 border border-gray-300 text-xs sm:text-sm rounded-lg block w-full p-2.5"
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <div className="mt-4 mb-4 text-center">
              <span className="text-red-600 text-md">{error}</span>
            </div>
          )}

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
  );
};

export default CategoriesEditModal;
