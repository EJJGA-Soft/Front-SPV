'use client'
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useSnackbar } from "notistack";
import BaseService from "@/services/base_service";
import { IProveedores } from "@/interfaces/Proveedores/proveedor_interface";

interface ProveedoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  itemEntity?: IProveedores;
}

const baseService = new BaseService();

const ModalProveedores: React.FC<ProveedoresModalProps> = ({
  onClose,
  onSave,
  itemEntity,
}) => {
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [numeroCelular, setNumeroCelular] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (itemEntity) {
      setNombreEmpresa(itemEntity.nombreEmpresa);
      setNumeroCelular(itemEntity.numeroCelular || "");
    } else {
      setNombreEmpresa("");
      setNumeroCelular("");
    }
  }, [itemEntity]);

  const handleGuardar = async () => {
    setLoading(true);

    if (!nombreEmpresa || !numeroCelular) {
      enqueueSnackbar("Por favor, completa todos los campos", { variant: "error" });
      setLoading(false);
      return;
    }

    const newProveedor: IProveedores = {
      nombreEmpresa,
      numeroCelular,
      esBorrado: false,
    };

    try {
      let response;
      if (itemEntity) {
        newProveedor.id = itemEntity.id;
        response = await baseService.Put(`/Proveedor/${itemEntity.id}`, newProveedor);
      } else {
        response = await baseService.Post("/Proveedor", newProveedor);
      }
      if (response.success) {
        enqueueSnackbar(
          itemEntity ? "Proveedor actualizado exitosamente" : "Proveedor guardado exitosamente",
          { variant: "success" },
        );
        onSave();
        onClose();
      } else {
        enqueueSnackbar(response.message || "Hubo un error al guardar el proveedor.", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error en el servidor al procesar la solicitud.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-4 w-full max-w-xs sm:max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {itemEntity ? "Editar proveedor" : "Agregar proveedor"}
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

        <div className="p-4 space-y-4">
          <div>
            <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-900">
              Nombre de la empresa
            </label>
            <input
              type="text"
              value={nombreEmpresa}
              onChange={(e) => setNombreEmpresa(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-xs sm:text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-900">
              NÃºmero de contacto
            </label>
            <input
              type="text"
              value={numeroCelular}
              onChange={(e) => setNumeroCelular(e.target.value)}
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
              type="button"
              onClick={handleGuardar}
              disabled={loading}
              className={`text-white font-semibold rounded-lg px-4 py-2 text-xs sm:text-sm ${
                loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {loading ? "Guardando..." : itemEntity ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProveedores;
