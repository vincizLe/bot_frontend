import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://127.0.0.1:8000/users/exist/ '; // Replace with your real API URL

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<{ id: number,username:string,password:string,createdAt:Date,updatedAt:Date }> {
        
        return this.http.post<{ id: number,username:string,password:string,createdAt:Date,updatedAt:Date }>(this.apiUrl, { username, password }).
        pipe(
            catchError(error => {
                return throwError(() => error); 
            })
        );
    }
}
