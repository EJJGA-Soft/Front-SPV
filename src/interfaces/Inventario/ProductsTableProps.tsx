import { Producto } from "./producto_interface";

export interface ProductsTableProps {
    productos: Producto[]; // Array de productos
    currentPage: number; // Página actual
    productosPerPage: number; // Productos por página
    handleNextPage: () => void; // Función para avanzar a la siguiente página
    handlePrevPage: () => void; // Función para retroceder a la página anterior
}