import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaiementFournisseurComponent} from './paiement-fournisseur/paiement-fournisseur.component';
import {NouveauReglementComponent} from './nouveau-reglement/nouveau-reglement.component';
import {PaiementClientComponent} from './paiement-client/paiement-client.component';
import { ListDecaissementsComponent } from './list-decaissements/list-decaissements.component';
import { ListEncaissementsComponent } from './list-encaissements/list-encaissements.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'reglement-client',
      component: PaiementClientComponent,
    },
    {
      path: 'paiement-fournisseur',
      component: PaiementFournisseurComponent,
    },
    {
      path: 'reglement-client',
      component: PaiementClientComponent,
    },
    {
      path: 'decaissements',
      component: ListDecaissementsComponent,
    },
    {
      path: 'encaissements',
      component: ListEncaissementsComponent,
    },
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaisieEncaissmentsRoutingModule {
}
