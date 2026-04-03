export type TaskType = {
    _id: number;
    name: string;
    done: boolean;
}

export type TaskDetailsType = {
    _id: number;
    name: string;
    done: boolean;
    createdAt: Date;
}