import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillCalendarFill } from 'react-icons/bs';

interface ModalCorteProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateReport: () => void;
  onViewPDF: () => void;
}

const ModalCorte: React.FC<ModalCorteProps> = ({
  isOpen,
  onClose,
  onGenerateReport,
  onViewPDF,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const clearStartDate = () => setStartDate(null);
  const clearEndDate = () => setEndDate(null);

  if (!isOpen) return null;

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

        <div className="flex flex-col space-y-6 p-4 justify-center items-center">
          {/* Fecha de Inicio */}
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-900 mb-2 text-center">Fecha de inicio</label>
            <div className="relative">
              <input
                type="date"
                id="startDate"
                value={startDate ? startDate.toLocaleDateString('en-CA') : ''}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 pl-10 pr-12"
              />
            
              {startDate && (
                <div
                  onClick={clearStartDate}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  <AiOutlineClose className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-900 mb-2 text-center">Fecha fin</label>
            <div className="relative">
              <input
                type="date"
                id="endDate"
                value={endDate ? endDate.toLocaleDateString('en-CA') : ''}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 pl-10 pr-12"
              />
           
              {endDate && (
                <div
                  onClick={clearEndDate}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  <AiOutlineClose className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-6 w-full max-w-xs">
            <button
              type="button"
              onClick={onGenerateReport}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Generar corte
            </button>
            <button
              type="button"
              onClick={onViewPDF}
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
