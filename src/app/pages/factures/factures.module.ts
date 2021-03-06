import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {MatTableModule} from '@angular/material';
import {UtilsServiceService} from '../../utils-service.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalModule} from 'ngx-bootstrap/modal';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {FacturesRoutingModule} from './factures-routing.module';
import { ListeFacturesFournisseursComponent } from './liste-factures-fournisseurs/liste-factures-fournisseurs.component';
import { ListeFacturesClientsComponent } from './liste-factures-clients/liste-factures-clients.component';
import { AddNewFactureClientComponent } from './add-new-facture-client/add-new-facture-client.component';
import { AddNewFactureFournisseurComponent } from './add-new-facture-fournisseur/add-new-facture-fournisseur.component';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import {LOCALE_ID} from '@angular/core';
import { InterceptService } from '../../services/InterceptService.service';
registerLocaleData(localeFr, 'fr', localeFrExtra);

@NgModule({
  declarations: [ListeFacturesFournisseursComponent, ListeFacturesClientsComponent, AddNewFactureClientComponent, AddNewFactureFournisseurComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    ConfirmDialogModule,
    FacturesRoutingModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    MatTableModule,
    NgbModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule, NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    DynamicDialogModule,
    NbUserModule, FormsModule,
    ModalModule.forRoot(), Ng2SmartTableModule, PanelModule, DialogModule,
  ],
  providers: [UtilsServiceService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptService,
    multi: true
  }, ConfirmationService, DialogService,  { provide: LOCALE_ID, useValue: "fr-FR" }],
})
export class FacturesModule { }
