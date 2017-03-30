export interface User{
    email: string,
    firstName: string,
    secondName: string,
    avatar: string,
    status: string,
    created: string,
    projects: any,
    users: any,
    active: boolean,
    password?: string,
    passwordRepeat?: string,
    newUser?: boolean
}