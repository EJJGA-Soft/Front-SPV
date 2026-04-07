import React from "react";
import { DeleteModalProps } from "../interfaces/DeleteModalProps";
import BaseService from '../modules/services/base_service';
import { FiX } from "react-icons/fi";

const baseService = new BaseService();
const ConfirmDeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirmDelete, entity, itemEntity, deleteRoute }) => {
  if (!isOpen) return null;

  const HandleDelete = async (id: string) => {
    const response = await baseService.Delete(deleteRoute.replace("{id}, id"));
    if (response.success) {
      onClose();
      onConfirmDelete(id);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Confirmar Eliminación</h2>
          <button onClick={onClose}>
          <FiX className="text-2xl" />
          </button>
        </div>

        <p className="text-gray-700 mb-4">
          ¿Estás seguro de que deseas eliminar {entity} <strong> {itemEntity.name || itemEntity.nombreEmpresa || itemEntity.nombre}</strong>?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => HandleDelete(itemEntity.id!)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;