import { UserType } from "./user.type";

export type TaskType = {
    _id: number;
    name: string;
    done: boolean;
    user: UserType;
}

export type TaskDetailsType = {
    _id: number;
    name: string;
    done: boolean;
    user: UserType;
    createdAt: Date;
}