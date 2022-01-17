import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciamentoEfetivoRoutingModule } from './gerenciamento-efetivo-routing.module';
import { EfetivoConsultaContainerComponent } from './efetivo-consulta-container/efetivo-consulta-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { SkeletonTableModule } from 'src/app/shared/components/skeleton-table/skeleton-table.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PickListModule } from 'primeng/picklist';
import { DropdownModule } from 'primeng/dropdown';
import { EfetivoCadastroContainerComponent } from './efetivo-cadastro-container/efetivo-cadastro-container.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmationService } from 'primeng/api';
import { EfetivoDetalheContainerComponent } from './efetivo-detalhe-container/efetivo-detalhe-container.component';
import {InputMaskModule} from 'primeng/inputmask';


@NgModule({
  declarations: [
    EfetivoConsultaContainerComponent,
    EfetivoCadastroContainerComponent,
    EfetivoDetalheContainerComponent,
  ],
  imports: [
    CommonModule,
    GerenciamentoEfetivoRoutingModule,
    SkeletonTableModule,
    PaginatorModule,
    ConfirmDialogModule,
    TableModule,
    AutoCompleteModule,
    ToolbarModule,
    CardModule,
    TooltipModule,
    RippleModule,
    InputTextModule,
    ReactiveFormsModule,
    DividerModule,
    TabViewModule,
    InputNumberModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    CheckboxModule,
    SplitButtonModule,
    SkeletonModule,
    PickListModule,
    DropdownModule,
    TriStateCheckboxModule,
    TabMenuModule,
    BreadcrumbModule,
    RadioButtonModule,
    InputMaskModule
  ],
  providers: [ConfirmationService],
})
export class GerenciamentoEfetivoModule {}
