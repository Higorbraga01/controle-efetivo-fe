import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Inspecao, InspecaoRequest } from '../models/inspecao.model';
import { Pageable } from '../models/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class InspecaoService {
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

  save(inspecao: InspecaoRequest): Observable<InspecaoRequest> {
    return this.http.post<InspecaoRequest>(`${this.endpoint}/inspecoes`, inspecao)
      .pipe(take(1));
  }


  getAll(search?: any): Observable<Pageable<Inspecao>> {
    this.removeEmptyFields(search)
    const params = this.buildHttpParams(search);
    return this.http
      .get<Pageable<Inspecao>>(`${this.endpoint}/inspecoes`,{ params })
      .pipe(take(1));
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.endpoint}/inspecoes/${ id }`,)
  }

  findByID(id: number): Observable<Inspecao> {
    return this.http
      .get<Inspecao>(`${this.endpoint}/inspecoes/${ id }`,)
  }

  countInspecoesEfetivoOm(organizacaoId: string): Observable<number> {
    return this.http
      .get<number>(`${this.endpoint}/inspecoes/organizacao/count/${organizacaoId}`,)
  }

  buscarInspecoesVencidasPorOrganizacao(organizacaoId: string): Observable<Pageable<Inspecao>> {
    return this.http
      .get<Pageable<Inspecao>>(`${this.endpoint}/inspecoes/vencidas/${organizacaoId}`,)
  }
}
