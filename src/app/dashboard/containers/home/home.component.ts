import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public customers: any[]
  public dialogVisible: boolean;
  public siglaUnidadeSelecionada: string;

  constructor() { }

  ngOnInit(): void {
    this.siglaUnidadeSelecionada = 'CCA-RJ';
    this.customers = [
      {
        name: 'teste',
        country: 'teste',
        company: 'teste',
        representative: 'teste'
      },
      {
        name: 'teste',
        country: 'teste',
        company: 'teste',
        representative: 'teste'
      },
      {
        name: 'teste',
        country: 'teste',
        company: 'teste',
        representative: 'teste'
      },
      {
        name: 'teste',
        country: 'teste',
        company: 'teste',
        representative: 'teste'
      },
      {
        name: 'teste',
        country: 'teste',
        company: 'teste',
        representative: 'teste'
      },      {
        name: 'teste',
        country: 'teste',
        company: 'teste',
        representative: 'teste'
      },
      {
        name: 'teste',
        country: 'teste',
        company: 'teste',
        representative: 'teste'
      },      {
        name: 'teste',
        country: 'teste',
        company: 'teste',
        representative: 'teste'
      }
    ]
  }

  showDialog() {
    this.dialogVisible = true;
}

}
