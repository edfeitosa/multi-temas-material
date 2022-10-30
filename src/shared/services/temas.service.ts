import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { take, tap, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  diretorio: string = './assets/styles/temas/definicoes-cores';

  constructor(private http: HttpClient) { }

  public carregaTema(arquivo: string): Observable<object> {
    console.log('arquivo -> ', arquivo);
    console.log(`${this.diretorio}/${arquivo}.json`);
    return this.http.get<object>(`${this.diretorio}/${arquivo}.json`)
      .pipe(
        take(1),
        tap(arquivo => arquivo),
        catchError(this.resolvaErro)
      );
  }

  private resolvaErro(error: any) {
    return throwError(() => {
      return this.mensagensErro(error);
    });
  }

  private mensagensErro(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Não encontrado: ${error.message}`;
      }
      case 403: {
        return `Acesso negado: ${error.message}`;
      }
      case 500: {
        return `Erro interno do servidor: ${error.message}`;
      }
      default: {
        return `Erro desconhecido do servidor: ${error.message}`;
      }
    }
  }
}