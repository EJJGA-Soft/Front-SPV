
export interface ModalVentasDetalleProps {
  ventaId: number;
  usuarioNombre?: string;
  tipoPago?: string;
  pagoTotal?: number;
  fechaVenta?: string;
  closeModal: () => void;
}