import {
  HttpHeaders,
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
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

  gerarRelatorio(organizacaoId: string, options: any): Observable<Blob> {
    let params = this.buildHttpParams(options);
    return this.http.get(
      `${this.endpoint}/relatorios/efetivo/${organizacaoId}`,
      {
        params:params,
        reportProgress: true,
        responseType: 'blob' }
    ).pipe(take(1));
  }
}
