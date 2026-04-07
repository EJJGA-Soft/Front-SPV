import { ProductoVenta } from "../../../components/abarrotes/VentasTable";
import { IVentas } from "./ventas_interface";

export interface VentasTableProps {
    ventas: IVentas[];
    currentPage: number;
    ventasPerPage: number;
    handleNextPage: () => void;
    handlePrevPage: () => void;
    isLoading: boolean;
    getUserById: (uid: string) => Promise<void>;
    usuarioNombre: string | null;
  }