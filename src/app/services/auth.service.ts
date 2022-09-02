import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

import { environment } from "../../environments/environment";
import { User } from "../models/user.model";



export interface RegisterResponseData {
  status: number,
  message: string,
}
export interface LoginResponseData {
  status: number,
  message: string,
  data: {
    user: User,
    token: string,
    expiresIn: number
  }
}

export interface VerifyResponseData {
  status: number,
  message: string
}

@Injectable({ providedIn: 'root' })

export class AuthService {
  user = new Subject<User>();
  isLoading = new Subject<boolean>();
  error: string = "";
  message: string = "";
  serverMessage = 'Internal Server Error';
  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string) {
    return this.http.post<RegisterResponseData>(`${environment.API_URL}/user/register`, { name, email, password })
      .pipe(
        catchError(errorRes => {
          this.error = errorRes.error.error;
          this.isLoading.next(false);
          return this.handleError(errorRes);
        }),
        map(resData => {
          return resData;
        }),
      );
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponseData>(`${environment.API_URL}/auth/login`, { email, password })
      .pipe(
        catchError(errorRes => {
          this.error = errorRes.error.error;
          this.isLoading.next(false);
          return this.handleError(errorRes);
        }),
        map(resData => {
          return resData;
        }),
      );
  }

  logout() {
    // this.user.next(null);
    localStorage.removeItem('userData');
  }

  getUser() {
    return this.user.asObservable();
  }


  handleError(err: any) {
    let errorMessage = 'An unknown error occurred!';
    if (!err.error || !err.error.message) {
      return throwError(() => new Error(errorMessage));
    }
    return throwError(() => new Error(err.error.message));
  }
}
