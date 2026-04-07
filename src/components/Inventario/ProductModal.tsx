import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ICategoria } from "../../interfaces/Inventario/categoria_interface";
import { IProveedores } from "../../interfaces/Proveedores/proveedor_interface";
import BaseService from "../../modules/services/base_service";
import { Producto } from "../../interfaces/Inventario/producto_interface";
import { useSnackbar } from "notistack";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onReload: () => void;
}

const baseService = new BaseService();

const ProductModal: React.FC<ProductModalProps> = ({ onClose, onReload }) => {

    const [preview, setPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<ICategoria[]>([]);
    const [providers, setProviders] = useState<IProveedores[]>([]);
    const [producto, setProducto] = useState<Producto>({
        id: 0,
        nombre: '',
        precio: 0,
        stock: 0,
        urlImagen: '',
        Imagen: new Blob(),
        categoriaId: 0,
        proveedorId: 0,
        esBorrado: false,
    });
    const { enqueueSnackbar } = useSnackbar(); // Hook para los mensajes interactivos

    // Función para la imagen previa
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setProducto({ ...producto, Imagen: new Blob([file], { type: file.type }) });
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    });

    // Función para obtener categorías
    const getCategories = async () => {
        try {
            const response = await baseService.Get<ICategoria>("/Categorias");
            if (response.success) {
                setCategories(response.data as ICategoria[]);
            }
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    };

    // Función para obtener proveedores
    const getProviders = async () => {
        try {
            const response = await baseService.Get<IProveedores>("/Proveedor");
            if (response.success) {
                setProviders(response.data as IProveedores[]);
            }
        } catch (error) {
            console.error("Error al obtener proveedores:", error);
        }
    };

    useEffect(() => {
        
        getCategories();
        getProviders();
    }, []);
    useEffect(() => {
        const isFormValid =
            producto.nombre.trim() !== '' &&
            producto.precio > 0 &&
            producto.stock > 0 &&
            producto.categoriaId > 0 &&
            producto.proveedorId > 0;
    }, [producto]);

    // Función para crear el producto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: name === 'precio' || name === 'stock' ? (value === '' ? '' : Number(value)) : value,
        });
    };

    const handleValidation = () => {
        const validations = [
        { condition: producto.nombre.trim() === '', message: "El campo 'Nombre' es obligatorio." },
        { condition: producto.precio <= 0, message: "El campo 'Precio' debe ser mayor a 0." },
        { condition: producto.stock <= 0, message: "El campo 'Stock' debe ser mayor a 0." },
        { condition: producto.categoriaId === 0, message: "Debe seleccionar una categoría." },
        { condition: producto.proveedorId === 0, message: "Debe seleccionar un proveedor." },
        ];
        for (const {condition, message} of validations){
            if(condition){
                enqueueSnackbar(message, { variant: "error" });
                return false;
            }
        }
        return true;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Datos enviados:", producto);

        if(!handleValidation()){
            return;
        }

        const formData = new FormData();

        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio.toString());
        formData.append('stock', producto.stock.toString());
        formData.append('categoriaId', producto.categoriaId!.toString());
        formData.append('proveedorId', producto.proveedorId!.toString());
        formData.append('esBorrado', producto.esBorrado ? 'true' : 'false');

        const blob = new Blob([producto.Imagen], { type: "image/jpeg" });
        formData.append('Imagen', blob, "producto.jpg");

        try {
            const response = await baseService.Post<Producto>('/Productos', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.success) {
                enqueueSnackbar("Producto creado exitosamente.", { variant: "success" });
                onClose();
                onReload();

            } else {
                enqueueSnackbar("Error al crear el producto. Intenta nuevamente.", { variant: "error" });
                console.error('Error al crear el producto:', response.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <>
            <div
                tabIndex={-1}
                aria-hidden="true"
                className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-xs sm:max-w-md bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-3 border-b">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Agregar producto</h3>
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

                    <div className="max-h-[80vh] overflow-y-auto">
                        <form className="p-3 space-y-3" onSubmit={handleSubmit}>
                            {/* Sección de Dropzone */}
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed rounded p-4 text-center relative cursor-pointer h-40 ${isDragActive ? "bg-blue-100 border-blue-400" : "border-gray-300"
                                    }`}
                            >
                                <input {...getInputProps()}
                                />
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Vista previa"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="flex flex-col justify-center items-center h-full">
                                        <div className="flex justify-center my-2">
                                            <img
                                                src="src/assets/icons/cloud-upload-svgrepo-com.png"
                                                alt="Icono de subida"
                                                className="w-10 h-10 sm:w-14 sm:h-14"
                                            />
                                        </div>
                                        <p className="text-gray-600 font-semibold text-xs sm:text-sm">
                                            {isDragActive
                                                ? "Suelta los archivos aquí..."
                                                : "Click para subir o arrastra y suelta"}
                                        </p>
                                        <p className="text-gray-600 font-semibold text-xs sm:text-sm">PNG, JPG</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-900">
                                    Stock
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-xs sm:text-sm rounded-lg block w-full p-2.5"
                                    name="stock"
                                    type="number"
                                    value={producto.stock}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-900">
                                    Nombre
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-xs sm:text-sm rounded-lg block w-full p-2.5"
                                    name="nombre"
                                    value={producto.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-900">
                                    Precio
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-xs sm:text-sm rounded-lg block w-full p-2.5"
                                    name="precio"
                                    type="number"
                                    value={producto.precio}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-900">
                                    Categoría
                                </label>
                                <select
                                    name="categoriaId"
                                    onChange={handleChange}
                                    value={producto.categoriaId || ''}
                                    className="bg-gray-50 border border-gray-300 text-xs sm:text-sm rounded-lg block w-full p-2.5 mb-6"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-900">
                                    Proveedor
                                </label>
                                <select
                                    name="proveedorId"
                                    value={producto.proveedorId || ''}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-xs sm:text-sm rounded-lg block w-full p-2.5 mb-6"
                                >
                                    <option value="">Selecciona un proveedor</option>
                                    {providers.map((proveedor) => (
                                        <option key={proveedor.id} value={proveedor.id}>
                                            {proveedor.nombreEmpresa}
                                        </option>
                                    ))}
                                </select>
                                
                            
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
                                    className="text-white font-semibold rounded-lg px-4 py-2 text-xs sm:text-sm bg-blue-700 hover:bg-blue-800"
                                    >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductModal;
