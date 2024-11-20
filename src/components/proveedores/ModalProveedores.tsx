import React, { useEffect, useState } from "react";
import { ProveedoresModalProps } from "../../interfaces/Proveedores/proveedoresModalProps";
import { Proveedores } from "../../interfaces/proveedores_interface";
import ProveedorService from "../../modules/services/proveedor/proveedores_service";
import { useSnackbar } from "notistack";

const ProveedoresModal: React.FC<ProveedoresModalProps> = ({
  isOpen,
  onClose,
  proveedor,
  onSave
}) => {
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [numeroCelular, setNumeroCelular] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (proveedor) {
      setNombreEmpresa(proveedor.nombreEmpresa);
      setNumeroCelular(proveedor.numeroCelular);
    } else {
      setNombreEmpresa("");
      setNumeroCelular("");
    }
  }, [proveedor]);

  if (!isOpen) return null;

  const handleGuardar = async () => {
    setLoading(true);
    setError(null);

    if(!nombreEmpresa || !numeroCelular){
      enqueueSnackbar("Por favor, completa todos los campos", {variant:"error"});
      setLoading(false);
      return;
    }

    const newProveedor: Proveedores = {
      nombreEmpresa,
      numeroContacto: numeroCelular
    };

    const proveedorService = new ProveedorService();

   const response = await proveedorService.AddProvService(newProveedor);
   if(response.success){
    onSave(newProveedor);
    onClose();
    enqueueSnackbar("Proveedor guardado exitosamente", {variant:"success"});
   } else{
    setError(response.message);
    enqueueSnackbar(response.message || "Error al guardar proveedor", { variant: "error" });
   }
   setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-6 w-full max-w-2xl bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">
            {proveedor ? "Editar Proveedor" : "Agregar Proveedor"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7L1 1m6 6l6-6"
              />
            </svg>
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Nombre de la Empresa
            </label>
            <input
              type="text"
              value={nombreEmpresa}
              onChange={(e) => setNombreEmpresa(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Número de Contacto
            </label>
            <input
              type="text"
              value={numeroCelular}
              onChange={(e) => setNumeroCelular(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleGuardar}
              disabled={loading}
              className={`ml-3 text-white ${
                loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
              } font-medium rounded-lg text-sm px-5 py-2.5`}
            >
              {loading
                ? "Guardando..."
                : proveedor
                ?"Actualizar"
                : "Guardar"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProveedoresModal;
