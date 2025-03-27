import { Author } from "./enums"

export class user {
    id: number 
    question: string 
    response: string 
    inputTokens: number
    outputTokens: number 
    totalTokens: number
    author: Author
    userId: Number
    createdAt: Date
    updatedAt: Date

    constructor(user:user){
        this.id = user.id;
        this.question = user.question;
        this.response = user.response;
        this.inputTokens = user.inputTokens;
        this.outputTokens = user.outputTokens;
        this.totalTokens = user.totalTokens;
        this.author = user.author;
        this.userId = user.userId;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}

export class User{
    id: number
    username: string
    password: string
    createdAt: Date
    updatedAt: Date

    constructor(user:User){
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}