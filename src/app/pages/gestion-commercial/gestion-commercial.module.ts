import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionCommercialRoutingModule } from './gestion-commercial-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { InterceptService } from '../../services/InterceptService.service';
import { UtilsServiceService } from '../../utils-service.service';
import { ListProduitsComponent } from './list-produits/list-produits.component';
import { AddNewProduitComponent } from './add-new-produit/add-new-produit.component';

import {FileUploadModule} from 'primeng/fileupload';
import { ListBonsLivraisonComponent } from './list-bons-livraison/list-bons-livraison.component';
import { AddNewBonLivraisonComponent } from './add-new-bon-livraison/add-new-bon-livraison.component';
import { BonLivraisonTemplateComponent } from './bon-livraison-template/bon-livraison-template.component';
import { ListFacturesComponent } from './list-factures/list-factures.component';
import { FactureTemplateComponent } from './facture-template/facture-template.component';
import { EditFactureComponent } from './edit-facture/edit-facture.component';
import { AddNewDevisComponent } from './add-new-devis/add-new-devis.component';
import { ListDevisComponent } from './list-devis/list-devis.component';
import { DevisTemplateComponent } from './devis-template/devis-template.component';
import { AddAvoirComponent } from './add-avoir/add-avoir.component';
import { TurnoverComponent } from './turnover/turnover.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {MultiSelectModule} from "primeng/multiselect";


@NgModule({
  declarations: [ListProduitsComponent,AddNewProduitComponent, ListBonsLivraisonComponent, AddNewBonLivraisonComponent, BonLivraisonTemplateComponent, ListFacturesComponent, FactureTemplateComponent, EditFactureComponent, AddNewDevisComponent, ListDevisComponent, DevisTemplateComponent, AddAvoirComponent, TurnoverComponent],
  imports: [
    FileUploadModule,
    AutoCompleteModule,
    HttpClientModule,
    GestionCommercialRoutingModule,
    CommonModule,
    ConfirmDialogModule,
    TableModule,
    CheckboxModule,
    MultiSelectModule,
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
    },  ConfirmationService, DialogService],
})
export class GestionCommercialModule { }
