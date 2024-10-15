import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

export class CabecalhoInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse(); 
    
    response.header('X-App-Name', 'Eco Feedback Hub');
    response.header('X-Powered-By', 'NestJS');

    return next.handle();
  }
}
