import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://127.0.0.1:8000/users/ '; // Replace with your real API URL

    constructor(private http: HttpClient) {}

    getUsers(): Observable<Array<{ id: number,username:string,password:string,createdAt:Date,updatedAt:Date }>> {
        
        return this.http.get<Array<{ id: number,username:string,password:string,createdAt:Date,updatedAt:Date }>>(this.apiUrl, { }).
        pipe(
            catchError(error => {
                return throwError(() => error); 
            })
        );
    }
}
