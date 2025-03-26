import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MetricsService {

  private apiUrl = 'http://127.0.0.1:8000/queries';  

  constructor(private http: HttpClient) {}

  countQueriesPerDateAndUsers(users: Array<number>,startDate:string,endDate:string): Observable<Array<{name: string,series: Array<{name:string,value:number}>}>> {
    const userId: number = Number(localStorage.getItem('userId'));

    return this.http.post<Array<{name: string,series: Array<{name:string,value:number}>}>>
    (`${this.apiUrl}/count/dateAndUsers/`, { startDate,endDate,users});
  }
}
