import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaiementFournisseurComponent} from './paiement-fournisseur/paiement-fournisseur.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'paiement-fournisseur',
      component: PaiementFournisseurComponent,
    },

  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaisieEncaissmentsRoutingModule {
}
