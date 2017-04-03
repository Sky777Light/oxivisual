export interface User{
    _id?: string,
    email: string,
    firstName?: string,
    secondName?: string,
    avatar?: string,
    role?: string,
    created?: string,
    projects?: any,
    users?: any,
    active?: boolean,
    password?: string,
    passwordRepeat?: string,
    newUser?: boolean
}