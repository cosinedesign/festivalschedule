
export interface IHash<T> {
    [index: string]: T;
}


export interface IUser {
    name: string,
    id: string,
    roles: Array<string>
}

