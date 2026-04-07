export interface ResponseHelperModel<T> {
    success: boolean;
    message?: string;
    data?: T[];
}

export interface ResponseHelperModelSimple<T> {
    success: boolean;
    message?: string;
    data?: T;
}

