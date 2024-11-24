import { useEffect, useState } from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { ICategoria } from '../../interfaces/Inventario/categoria_interface';
import BaseService from '../../modules/services/base_service';
import LoadingTables from '../loading/loadingtables';
import ConfirmDeleteModal from '../ModalDelete';
import CategoriesEditModal from './CategoriesModalEdit';
import { useSnackbar } from 'notistack';

const baseService = new BaseService();

interface Props{
  reload: boolean;
  setReload: (value: boolean) => void;
}

const CategoriesTable: React.FC<Props> = (reload, setReload) => {
  const [category, setCategory] = useState<ICategoria[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [categoryEdit, setCategoryEdit] = useState<ICategoria | null>(null);
  const [categoryDelete, setCategoryDelete] = useState<ICategoria | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriasPerPage = 5;
  const { enqueueSnackbar } = useSnackbar();

  const indexOfLastCategoria = currentPage * categoriasPerPage;
  const indexOfFirstCategoria = indexOfLastCategoria - categoriasPerPage;
  const currentCategorias = category.slice(indexOfFirstCategoria, indexOfLastCategoria);

  const handleNextPage = () => {
    if (currentPage * categoriasPerPage < category.length) {
        setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const getCategory = async() => {
    setLoading(true);
    const response = await baseService.Get<ICategoria>("/Categorias");
    const result = response.data as ICategoria[];
    if(response.success){
    setCategory(result);
    setLoading(false);  
    }
  }

  const HandleConfirmDelete = () => {
    enqueueSnackbar("¡La categoria ha sido eliminada con exito!", {variant: "success"} )
    getCategory();
    setCategoryDelete(null);
  }

  const HandleClose = () =>{
    setCategoryDelete(null);
    setOpenModal(false);
  }
  
  const HandleCloseEdit = () => {
    setOpenModalEdit(false)
    setCategoryEdit(null);
  }

  const UpdateCategory = () => {
    enqueueSnackbar("¡Ha sido actualizada la categoria con exito!", {variant: "success"})
    getCategory();
    setCategoryEdit(null);
  }


  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (reload) {
      getCategory().then(() => setReload(false));
    }
  }, [reload, setReload]);
  
  return (
    <>
      {loading ? (
  <LoadingTables />
) : (
  <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
    <table className="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-white text-gray-700 text-center">
          <th className="p-4 text-xs sm:text-base">Categoría</th>
          <th className="p-4 text-xs sm:text-base">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {currentCategorias.length <= 0 ? (
          <tr>
            <td
              className="p-4 text-center text-gray-500"
              colSpan={2} // Asegúrate de que este valor coincida con la cantidad de columnas en la tabla
            >
              No hay categorías disponibles.
            </td>
          </tr>
        ) : (
          currentCategorias.map((categoria) => (
            <tr
              key={categoria.id}
              className="border-t border-gray-200 text-center text-sm"
            >
              <td className="p-4 break-all">{categoria.nombre}</td>
              <td className="p-4 flex justify-center space-x-4">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Editar categoría"
                  onClick={() => {
                    setOpenModalEdit(true);
                    setCategoryEdit(categoria);
                  }}
                >
                  <HiPencil className="w-5 h-5" />
                </button>

                <button
                  className="text-red-500 hover:text-red-700"
                  aria-label="Eliminar categoría"
                  onClick={() => {
                    setOpenModal(true);
                    setCategoryDelete(categoria);
                  }}
                >
                  <HiTrash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)}


      {/* Paginacion */}
      <div className="flex justify-between items-center mt-6 flex-wrap">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs sm:text-base"
        >
          Antes
        </button>

        <span className="text-gray-900 text-xs sm:text-base font-semibold">
          Página {currentPage} de {Math.ceil(category.length / categoriasPerPage)}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage * categoriasPerPage >= category.length}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs sm:text-base"
        >
          Siguiente
        </button>
      </div>

      {/* MODAL DE ELIMINACION */}
      {openModal && (
        <>
          <ConfirmDeleteModal
            isOpen={openModal}
            onClose={HandleClose}
            onConfirmDelete={() => {
              HandleConfirmDelete();
            }}
            entity={"Categoria"}
            itemEntity={categoryDelete}
            deleteRoute={`/Categorias/${categoryDelete!.id}`}
          />
        </>
      )}

      {/* MODAL DE EDITAR */}
      {
        openModalEdit && (
          <>
          <CategoriesEditModal isOpen={openModalEdit} onClose={HandleCloseEdit} onSave={UpdateCategory} itemEntity={categoryEdit!}/>
          </>
        )
      }
    </>
  );
};

export default CategoriesTable;
