import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from './user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:4001';

  constructor(private http: HttpClient) { }

  signup(user: User) {
    return this.http.post(`${this.baseUrl}/users/create`, user);
  }

  login(username: string, password: string) {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/api/login`, body);
  }

  listarUsers(){
    return this.http.get<User[]>(`${this.baseUrl}/api/listar-users/`);
  }
}
