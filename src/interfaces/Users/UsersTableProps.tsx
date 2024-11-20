import { IAccount } from "../newAccount._interface";

export interface UsersTableProps{
    users: IAccount[];
    currentPage: number;
    usersPerPage: number;
    handleNextPage: () => void;
    handlePrevPage: () => void;
    isLoading: boolean;
}