import React, { useEffect, useState } from "react";
import { ProveedoresModalProps } from "../../interfaces/Proveedores/proveedoresModalProps";
import { Proveedores } from "../../interfaces/proveedores_interface";
import ProveedorService from "../../modules/services/proveedor/proveedores_service";
import { useSnackbar } from "notistack";
import BaseService from "../../modules/services/base_service";
import { IProveedores } from "../../interfaces/Proveedores/proveedor_interface";

const ProveedoresModal: React.FC<ProveedoresModalProps> = ({
  isOpen,
  onClose,
  proveedor,
  onSave
}) => {
  const [proveedores, setProveedores] = useState<IProveedores[]>([]);
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [numeroContacto, setNumeroContacto] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

 

  useEffect(() => {
    if (proveedor) {
      console.log('ID recibido:', proveedor.id);

      setNombreEmpresa(proveedor.nombreEmpresa);
      setNumeroContacto(proveedor.numeroCelular || "");
    } else {
      setNombreEmpresa("");
      setNumeroContacto("");
    }
  }, [isOpen, proveedor]);

  if (!isOpen) return null;

  const handleGuardar = async () => {
    setLoading(true);
    setError(null);

    if(!nombreEmpresa || !numeroContacto){
      enqueueSnackbar("Por favor, completa todos los campos", {variant:"error"});
      setLoading(false);
      return;
    }

    const newProveedor: IProveedores = {
      nombreEmpresa,
     numeroContacto
    };

    const baseService = new BaseService();
    try {
      let response;
      if(proveedor){
        newProveedor.id = proveedor.id;
        response = await baseService.Put(`/Proveedor/${proveedor.id}`, newProveedor);
        console.log("Respuesta del servidor:", response);
        

      } else {
        response = await baseService.Post("/Proveedor", newProveedor);
      }
      if(response.success){
        onSave(newProveedor);
        onClose();
        enqueueSnackbar(proveedor ? "Proveedor actualizado exitosamente" : "Proveedor guardado exitosamente", { variant: "success" });

      } else{
        setError(response.message!);
        enqueueSnackbar(response.message || "Hubo un error al guardar el proveedor.", { variant: "error" });

      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error en el servidor al procesar la solicitud.", { variant: "error" });

    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-6 w-[50vh] h-[60vh] max-w-2xl bg-white rounded-lg shadow-lg ">
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">
            {proveedor ? "Editar Proveedor" : "Agregar Proveedor"}
          </h3>
          <button
          onClick={onClose}
          className="text-gray-500 hover:bg-gray-200 rounded-full p-2"
        >
          ✕
        </button>
        </div>
        <div className="p-4 w-full mt-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Nombre de la Empresa
            </label>
            <input
              type="text"
              value={nombreEmpresa}
              onChange={(e) => setNombreEmpresa(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>


          <div className="mb-4 mt-8">
            <label className="block text-sm font-medium text-gray-900">
              Número de Contacto
            </label>
            <input
              type="text"
              value={numeroContacto}
              onChange={(e) => setNumeroContacto(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <div className="flex justify-center mt-10">
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
