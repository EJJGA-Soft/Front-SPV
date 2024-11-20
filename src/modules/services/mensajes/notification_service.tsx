import { enqueueSnackbar } from 'notistack';

class NotificationService {
  static showSuccess(message: string) {
    enqueueSnackbar(message, { variant: 'success' });
  }

  static showError(message: string) {
    enqueueSnackbar(message, { variant: 'error' });
  }

  static showInfo(message: string) {
    enqueueSnackbar(message, { variant: 'info' });
  }

  static showWarning(message: string) {
    enqueueSnackbar(message, { variant: 'warning' });
  }
}

export default NotificationService;
