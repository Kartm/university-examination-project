export interface User {
    id: string;
    pseudo: string;
    email: string;
    password: string;
    role: "user" | "premium" | "admin";
}

export interface CreateUser {
    pseudo: string;
    email: string;
    password: string;
}