import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { environment } from '../environments/environment';
import { authProviderBuilder } from '../auth/lib/providers/auth.provider';
import { HttpClientModule } from '@angular/common/http';
import { BaseWrapperModule } from './shared/components/base-wrapper/base-wrapper.module';
import { KeycloakAngularModule } from 'keycloak-angular';

import { ToolbarModule } from 'primeng/toolbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InspecaoConsultaContainerComponent } from './modules/gerenciamento-efetivo/containers/inspecao/inspecao-consulta-container/inspecao-consulta-container.component';

registerLocaleData(localePt);

const authProvider = authProviderBuilder({
  url: environment.KEYCLOAK_URL,
  realm: environment.KEYCLOAK_REALM,
  clientId: environment.KEYCLOAK_CLIENT_ID
});

@NgModule({
  declarations: [
    AppComponent,
    InspecaoConsultaContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BaseWrapperModule,
    KeycloakAngularModule,
    AutoCompleteModule,
    ToolbarModule,
    CardModule,
    TableModule,
    ButtonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    // authProvider,
    { provide: 'API_ENDPOINT', useValue: environment.BASE_API_URL },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
