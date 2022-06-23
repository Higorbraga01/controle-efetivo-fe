import { SharedDataService } from './../../../../service/shared-data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'controle-inspecao-filtro',
  templateUrl: './inspecao-filtro.component.html',
  styleUrls: ['./inspecao-filtro.component.scss']
})
export class InspecaoFiltroComponent implements OnInit {
  _isHidden = true;
  @Input() isButtonDisabled: boolean;

  _form: FormGroup;

  @Input() tiposEfetivo: any[];
  @Input() pessoas: SelectItem[];

  @Output() formValue = new EventEmitter();
  @Output() tipoEfetivo = new EventEmitter();
  @Output() tableUpdate = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this._form = this.fb.group({
      nomePessoa: this.fb.control(null),
      tipoEfetivo: this.fb.control(null),
    });
  }

  filterTipoEfetivo(event: any) {
      this.formValue.emit(this._form.value.tipoEfetivo);
  }

  onClear() {
    this._form.reset();
    this.updateTable();
    this.togglePanelFiltro();
  }

  togglePanelFiltro() {
    this._isHidden = !this._isHidden;
  }

  search(event?: any): void {
    if(event){
    this.tipoEfetivo.emit(event);
    }else{
      this.tipoEfetivo.emit(null);
    }
  }

  updateTable(event?: any){
    if(event){
      this.tableUpdate.emit(event.value);
      this.togglePanelFiltro();
    }else{
      this.tableUpdate.emit(null);
    }

  }

}
