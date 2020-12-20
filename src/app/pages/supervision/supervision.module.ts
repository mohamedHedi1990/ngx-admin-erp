import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupervisionRoutingModule} from './supervision-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {MatTableModule} from '@angular/material';
import {UtilsServiceService} from '../../utils-service.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalModule} from 'ngx-bootstrap/modal';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import {DatePipe, registerLocaleData} from '@angular/common';
registerLocaleData(localeFr, 'fr', localeFrExtra);
import { GlobalSupervisionComponent } from './global-supervision/global-supervision.component';
import {StatusCardComponent} from './status-card/status-card.component';
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
import { EtatGlobalTreserorieComponent } from './etat-global-treserorie/etat-global-treserorie.component';
import { EtatNonEngageComponent } from './etat-non-engage/etat-non-engage.component';
import { RapprochementBancaireComponent } from './rapprochement-bancaire/rapprochement-bancaire.component';
import { InterceptService } from '../../services/InterceptService.service';
import { EtatEngageComponent } from './etat-engage/etat-engage.component';

@NgModule({
  declarations: [GlobalSupervisionComponent, StatusCardComponent, EtatGlobalTreserorieComponent, EtatNonEngageComponent, EtatEngageComponent, RapprochementBancaireComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    SupervisionRoutingModule,
    CommonModule,
    ConfirmDialogModule,
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
    HttpClientModule,
    DynamicDialogModule,
    NbUserModule, FormsModule,
    ModalModule.forRoot(), Ng2SmartTableModule, PanelModule, DialogModule,
  ],
  providers: [UtilsServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }, ConfirmationService, DialogService],
})
export class SupervisionModule { }
