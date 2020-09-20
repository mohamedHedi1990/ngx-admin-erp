import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocietesComponent } from './societes/societes.component';
import { FichierRoutingModule } from './fichier-routing.module';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {MatTableModule} from '@angular/material';
import {UtilsServiceService} from '../../utils-service.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SaisirSocieteComponent } from './saisir-societe/saisir-societe.component';
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
import { DetailsSocieteComponent } from './details-societe/details-societe.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {AddNewClientComponent} from './add-new-client/add-new-client.component';
import {PanelModule} from 'primeng/panel';
import { NewContactComponent } from './new-contact/new-contact.component';
import {ListFournisseursComponent} from './list-fournisseurs/list-fournisseurs.component';
import { AddNewProviderComponent } from './add-new-provider/add-new-provider.component';
import { ListComptesComponent } from './list-comptes/list-comptes.component';
import { AddNewCompteComponent } from './add-new-compte/add-new-compte.component';
import {DialogModule} from 'primeng/dialog';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {ListeEchenaciersComponent} from './liste-echenaciers/liste-echenaciers.component';
import {ListeTarifsBancaireComponent} from './liste-tarifs-bancaire/liste-tarifs-bancaire.component';
import {AddNewTarifsBancaireComponent} from './add-new-tarifs-bancaire/add-new-tarifs-bancaire.component';
import {AddNewEchanchierComponent} from './add-new-echanchier/add-new-echanchier.component';
import {ListeContactsComponent} from './liste-contacts/liste-contacts.component';
import { NouvelleComissionComponent } from './nouvelle-comission/nouvelle-comission.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { ListSocietesComponent } from './list-societes/list-societes.component';
import { AddNewSocieteComponent } from './add-new-societe/add-new-societe.component';
@NgModule({
  declarations: [SocietesComponent, SaisirSocieteComponent, DetailsSocieteComponent, ListClientsComponent, ListContactsComponent, AddNewClientComponent, NewContactComponent, ListFournisseursComponent, AddNewProviderComponent, ListeContactsComponent, ListeTarifsBancaireComponent, AddNewTarifsBancaireComponent, AddNewEchanchierComponent,
          ListeEchenaciersComponent, ListComptesComponent, AddNewCompteComponent, NouvelleComissionComponent, ListSocietesComponent, AddNewSocieteComponent],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    FichierRoutingModule,
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
  providers: [UtilsServiceService, ConfirmationService, DialogService],
})
export class FichierModule { }
