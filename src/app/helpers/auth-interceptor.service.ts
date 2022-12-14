import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take, map } from "rxjs/operators";

import { AuthService } from "../services/auth.service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if(!user) {return next.handle(req);}
        const modifiedReq = req.clone({ setHeaders: { Authorization: `Bearer ${user.accessToken}` } });
        return next.handle(modifiedReq);
      })
    );
  }
}

