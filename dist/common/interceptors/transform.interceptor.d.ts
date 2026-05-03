import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export interface Response<T> {
    data: T;
    statusCode: number;
    message: string;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, Response<T> | T> {
    private readonly reflector;
    constructor(reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T> | T>;
}
