import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from '../models/pageable.model';
import { Pessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    protected http: HttpClient,
    @Inject('API_ENDPOINT') private endpoint: string
  ) {}

  getPessoas(): Observable<Pageable<Pessoa>> {
    return this.http.get<Pageable<Pessoa>>(`${this.endpoint}/pessoas`);
  }

  getAll(): Observable<Pageable<Pessoa>> {
    return this.http.get<Pageable<Pessoa>>(`${this.endpoint}/pessoas`, {
      headers: this.defaultHeaders,
    });
  }
}
