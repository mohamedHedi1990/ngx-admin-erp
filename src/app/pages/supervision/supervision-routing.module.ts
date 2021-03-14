import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtatEngageComponent } from './etat-engage/etat-engage.component';
import { EtatGlobalTreserorieComponent } from './etat-global-treserorie/etat-global-treserorie.component';
import { EtatNonEngageComponent } from './etat-non-engage/etat-non-engage.component';
import { GlobalSupervisionComponent } from './global-supervision/global-supervision.component';
import { RapprochementBancaireComponent } from './rapprochement-bancaire/rapprochement-bancaire.component';
import {EtatGlobalEngageComponent} from "./etat-global-engage/etat-global-engage.component";

const routes: Routes = [{
  path: '',
   // component: AddNewCompteComponent,
  children: [
    {
      path: 'etat-global',
      component: EtatGlobalTreserorieComponent,
    },
    {
      path: 'etat-engage',
      component: EtatEngageComponent,
    },
    {
      path: 'etat-non-engage',
      component: EtatNonEngageComponent,
    },
    {
      path: 'rapprochement-bancaire',
      component: RapprochementBancaireComponent
    } ,{
      path: 'etat-global-engage',
      component: EtatGlobalEngageComponent,
    },
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisionRoutingModule {
}
