import { IVenta } from "./ventas_interface";

export interface VentasTableProps {
  ventas: IVenta[];
  currentPage: number;
  ventasPerPage: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  isLoading: boolean;
  getUserById: (uid: string) => Promise<void>;
  usuarioNombre: string | undefined;
}
