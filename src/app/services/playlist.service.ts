import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getGeneros() {
    return this.http.get<string[]>(`${this.baseUrl}/generos`, { headers: this.getHeaders() });
  }

  registrarPlaylist(data: any) {
    return this.http.post(`${this.baseUrl}/lists`, data, { headers: this.getHeaders() });
  }

  buscarPlaylists() {
    return this.http.get<any>(`${this.baseUrl}/lists`, { headers: this.getHeaders() });
  }

  buscarPorNome(nome: string) {
    return this.http.get<any>(`${this.baseUrl}/lists/${nome}`, { headers: this.getHeaders() });
  }

  deletarPlaylist(nome: string) {
    return this.http.delete(`${this.baseUrl}/lists/${nome}`, { headers: this.getHeaders() });
  }
}