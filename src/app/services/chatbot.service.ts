import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatBotService {

  private apiUrl = 'http://127.0.0.1:8000/queries';  

  constructor(private http: HttpClient) {}

  createQuery(question: string): Observable<{question: string,response: string,inputTokens: number,outputTokens: number,totalTokens: number,userId: number}> {
    const userId: number = Number(localStorage.getItem('userId'));

    return this.http.post<{question: string,response: string,inputTokens: number,outputTokens: number,totalTokens: number,userId: number}>
    (this.apiUrl, { question,userId:userId });
  }
}
