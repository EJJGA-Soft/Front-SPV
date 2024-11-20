
export interface SnackbarProps {
    message: string;
    type: 'success' | 'error',
    onClose: () => void;
}
