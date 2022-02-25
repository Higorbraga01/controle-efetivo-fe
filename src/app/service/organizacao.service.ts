import { Organizacao } from './../models/organizacao.model';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Unidade } from '../models/Unidade';

@Injectable({
  providedIn: 'root'
})
export class OrganizacaoService {
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

  buscarTodasOrganizacoes(search?: any): Observable<Organizacao[]> {
    this.removeEmptyFields(search)
    const params = this.buildHttpParams(search);
    return this.http
      .get<Organizacao[]>(`${this.endpoint}/organizacoes`,{
       params
      })
      .pipe(take(1));
  }

  buscarOrganizacaoPorId(organizacaoId: string): Observable<Organizacao> {
    return this.http.get<Organizacao>(`${this.endpoint}/organizacoes/${organizacaoId}`)
  }
}
