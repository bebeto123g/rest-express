export interface IPost {
    id: number;
    title: string;
    text: string;
    createDate: Date | string;
}

export interface ITodo {
    id: number;
    title: string;
    completed: boolean;
}
