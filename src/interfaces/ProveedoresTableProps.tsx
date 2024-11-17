import { Proveedores } from "./proveedores_interface";

export interface ProveedoresTableProps{
    proveedores: Proveedores[];
    currentPage: number;
    proveedoresPerPage: number;
    handleNextPage: () => void;
    handlePrevPage: () => void;
}