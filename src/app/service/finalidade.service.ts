import { FinalidadeInspecao } from './../models/inspecao.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Pageable } from '../models/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class FinalidadeService {
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

  buscarFinalidades(search?: any): Observable<Pageable<FinalidadeInspecao>> {
    this.removeEmptyFields(search)
    const params = this.buildHttpParams(search);
    return this.http
      .get<Pageable<FinalidadeInspecao>>(`${this.endpoint}/finalidades-inspecao?${ params }`,)
      .pipe(take(1));
  }

}
