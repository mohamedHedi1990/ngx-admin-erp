import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaiementFournisseurComponent} from './paiement-fournisseur/paiement-fournisseur.component';
import {NouveauReglementComponent} from './nouveau-reglement/nouveau-reglement.component';
import {PaiementClientComponent} from './paiement-client/paiement-client.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'reglement-client',
      component: NouveauReglementComponent,
    },
    {
      path: 'paiement-fournisseur',
      component: PaiementFournisseurComponent,
    },
    {
      path: 'paiement-client',
      component: PaiementClientComponent,
    },
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaisieEncaissmentsRoutingModule {
}
