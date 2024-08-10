

export class JsonResponse<T> {
    message: string
    status: number
    data?: T | [T]

    constructor(message: string, status: number, response?:T){
        this.message = message
        this.status = status 
        this.data = Array.isArray(response) ? response : [response]
    }
}
