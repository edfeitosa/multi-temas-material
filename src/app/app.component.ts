import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { TemasService } from './../shared/services/temas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Estudo de Multi Temas';

  constructor(
    private temas: TemasService,
    private route: ActivatedRoute
  ) {
    this.verificaTemaQueryString();
  }

  private verificaTemaQueryString(): void {
    this.route.queryParams.subscribe(tema => this.carregaTema(tema['tema']));
  }

  private carregaTema(tema: string): void {
    this.temas.carregaTema(tema)
      .pipe(take(1)).subscribe(tema => this.carregaCores(tema))
  }

  private carregaCores(tema: any = null): void {
    document.documentElement.style.setProperty('--cor-primaria', tema['corPrimaria']);
    document.documentElement.style.setProperty('--cor-secundaria', tema['corSecundaria']);
    document.documentElement.style.setProperty('--texto-primario', tema['textoPrimario']);
    document.documentElement.style.setProperty('--texto-secundario', tema['textoSecundario']);
  }

  
}
