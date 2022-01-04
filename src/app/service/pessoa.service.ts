import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
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

  removeEmptyFields(data: any): void {
    if (!data) {
      return;
    }

    Object.keys(data).forEach(
      (key) =>
        (data[key] === null ||
          data[key] === '' ||
          data[key] === undefined ||
          data[key].length === 0) &&
        delete data[key]
    );
  }

  buildHttpParams(data: any): HttpParams {
    let params = new HttpParams();
    if (!data) {
      return params;
    }
    params = params.appendAll(data);
    return params;
  }

  getPessoas(): Observable<Pageable<Pessoa>> {
    return this.http.get<Pageable<Pessoa>>(`${this.endpoint}/pessoas`);
  }

  getAll(searchObject?: any): Observable<Pageable<Pessoa>> {
    return this.http.get<Pageable<Pessoa>>(`${this.endpoint}/pessoas`, {
      headers: this.defaultHeaders,
    });
  }
  getAllSearch(search?: any): Observable<Pageable<Pessoa>> {
    this.removeEmptyFields(search)
    const params = this.buildHttpParams(search);
    return this.http
      .get<Pageable<Pessoa>>(`${this.endpoint}/pessoas?${ params }&sort=posto.numeroOrdem,dataIncorporacao,ASC`,)
      .pipe(take(1));
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.endpoint}/pessoas/${ id }`,)
      .pipe(take(1));
  }
}
