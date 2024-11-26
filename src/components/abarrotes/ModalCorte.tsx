import React from "react";
import { FiX } from "react-icons/fi";
import NotificationService from "../../modules/services/mensajes/notification_service";
import BaseService from '../../modules/services/base_service';
import { UserStore } from "../../security/store/userStore";

interface ModalCorteProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateReport: () => void;
  onViewPDF: () => void;
}

const baseService = new BaseService();

const ModalCorte: React.FC<ModalCorteProps> = ({
  isOpen,
  onClose,
  onGenerateReport,
  onViewPDF,
}) => {
  // Obtener la fecha de hoy
  const today = new Date().toLocaleDateString("en-CA");
  const userid = UserStore((user) => user.id);

  if (!isOpen) return null;

  const HandleCorte = async () =>{
    const results = await baseService.GetSimple(`/Venta/Corte/${userid}`);

    console.log(results);

    if(results.success){
    NotificationService.showSuccess(results.message!);
    onClose();
    } else{ 
    NotificationService.showError(results.message!)
    }
  }

  const HandlePDF = async () => {
    try {
        const response = await baseService.GetSimpleEndpointPDF(
            `/Corte/GenerationPDFCorte/${userid}`,
            {}, // No envías parámetros adicionales
            'blob' // Aquí especificas que esperas un blob
        );

        // Verificar si la respuesta contiene datos
        if (!response || !response.data || response.data.size === 0) {
            NotificationService.showError("El archivo PDF está vacío");
            console.error("El archivo PDF está vacío");
            return;
        }

        const contentDisposition = response.headers['content-disposition'];

        let fileName = 'Corte_Productos.pdf';
        if (contentDisposition) {
            const match = contentDisposition.match(/filename\*=UTF-8''(.+)/);
            if (match && match[1]) {
                fileName = decodeURIComponent(match[1])
                    .replace(/[\/:*?"<>|]/g, '_')
                    .trim();
            }
        }

        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(pdfBlob);
        downloadLink.download = fileName;

        downloadLink.click();

        NotificationService.showSuccess("PDF descargado con éxito");
        onClose();
    } catch (error) {
        console.error('Error al generar PDF:', error);
        NotificationService.showError("Error inesperado al descargar el PDF");
    }
};


  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Corte de caja</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          >
            <FiX className="text-2xl" />
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>

        <div className="flex flex-col space-y-6 p-4 justify-center items-center">
          {/* Fecha */}
          <div className="w-full max-w-xs flex flex-col items-center justify-center">
            <label className="block text-sm font-medium text-gray-900 ml-[-10px] mb-2 text-center">
              Fecha Corte
            </label>
            <div className="relative w-full">
              <input
                type="date"
                id="date"
                value={today}
                disabled
                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-6 w-full max-w-xs">
            <button
              type="button"
              onClick={() => {HandleCorte()}}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Generar corte
            </button>
            <button
              type="button"
              onClick={() => {HandlePDF()}}
              className="w-full text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Ver PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCorte;
