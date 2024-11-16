export interface ResponseHelperModel<T> {
    success: boolean;
    message?: string;
    data?: T[];
}
