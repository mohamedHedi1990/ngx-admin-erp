import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
// RxJS
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // tslint:disable-next-line:no-debugger
    // modify request
console.log('tttttt');
    if (request.url.indexOf("assets") == -1) {
      console.log("url interceptor ");
      console.log(request.url);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }

    console.log("----request----");
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log("all looks good");
          }
        },
        (error) => {
          // http response status code
          console.log("----response----");
          console.error(error.status);
          console.error(error.message);
          console.log("--- end of response---");
        }
      )
    );
  }
  
}
