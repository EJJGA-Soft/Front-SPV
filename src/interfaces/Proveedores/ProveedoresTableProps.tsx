import { IProveedores } from "./proveedor_interface";

export interface ProveedoresTableProps{
    proveedores: IProveedores[];
    currentPage: number;
    proveedoresPerPage: number;
    handleNextPage: () => void;
    handlePrevPage: () => void;
    isLoading: boolean;

}