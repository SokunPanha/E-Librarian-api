import { ExceptionFilter, ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus();
        
        response
        .status(status)
        .json({
            status: status,
            message: exception.message
        })
        
    }
}