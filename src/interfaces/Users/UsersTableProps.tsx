import { IUser } from "../user_interface";

export interface UsersTableProps{
    users: IUser[];
    currentPage: number;
    usersPerPage: number;
    handleNextPage: () => void;
    handlePrevPage: () => void;
}