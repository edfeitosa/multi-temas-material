import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { take, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  diretorio: string = './assets/styles/temas/definicoes-cores';

  constructor(private http: HttpClient) { }

  public carregaTema(arquivo: string): Observable<object> {
    console.log(`${this.diretorio}/${arquivo}.json`);
    return this.http.get<object>(`${this.diretorio}/${arquivo}.json`)
      .pipe(
        take(1),
        tap(arquivo => arquivo),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    return throwError(() => {
      return error.status;
    });
  }
}
