import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  registerUser(formData: any) {
    return this.http.post(`${this.baseUrl}/signup`, formData);
  }
}