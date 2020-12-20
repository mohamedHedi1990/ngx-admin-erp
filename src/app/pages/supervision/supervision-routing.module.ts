import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtatEngageComponent } from './etat-engage/etat-engage.component';
import { EtatGlobalTreserorieComponent } from './etat-global-treserorie/etat-global-treserorie.component';
import { EtatNonEngageComponent } from './etat-non-engage/etat-non-engage.component';
import { RapprochementBancaireComponent } from './rapprochement-bancaire/rapprochement-bancaire.component';

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
      path: 'non-etat-engage',
      component: EtatNonEngageComponent,
    },
    {
      path: 'rapprochement-bancaire',
      component: RapprochementBancaireComponent
    }
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisionRoutingModule {
}
