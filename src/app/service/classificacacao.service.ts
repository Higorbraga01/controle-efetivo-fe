import { ClassificacaoInspecao } from './../models/inspecao.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassificacacaoService {
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

  buscarClassificacoes(search?: any): Observable<ClassificacaoInspecao[]> {
    this.removeEmptyFields(search)
    const params = this.buildHttpParams(search);
    return this.http
      .get<ClassificacaoInspecao[]>(`${this.endpoint}/classificacoes-inspecao?${ params }`,)
      .pipe(take(1));
  }

}
