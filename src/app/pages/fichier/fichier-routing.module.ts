import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SocietesComponent} from './societes/societes.component';
import {ListClientsComponent} from './list-clients/list-clients.component';
import {AddNewClientComponent} from './add-new-client/add-new-client.component';
import {ListFournisseursComponent} from './list-fournisseurs/list-fournisseurs.component';
import {ListComptesComponent} from './list-comptes/list-comptes.component';
import {ListeTarifsBancaireComponent} from './liste-tarifs-bancaire/liste-tarifs-bancaire.component';
import {ListeEchenaciersComponent} from './liste-echenaciers/liste-echenaciers.component';
import {ListSocietesComponent} from './list-societes/list-societes.component';

const routes: Routes = [{
  path: '',
   // component: AddNewCompteComponent,
  children: [
    {
      path: 'societes',
      component: ListSocietesComponent,
    },
    {
      path: 'clients',
      component: ListClientsComponent,
    },
    {
      path: 'nouveau-client',
      component: AddNewClientComponent,
    },
    {
      path: 'fournisseurs',
      component: ListFournisseursComponent,
    },
    {
      path: 'comptes',
      component: ListComptesComponent,
    },
    {
      path: 'tarifs-bancaires',
      component: ListeTarifsBancaireComponent,
    },
    {
      path: 'echeanciers',
      component: ListeEchenaciersComponent,
    },

  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichierRoutingModule {
}
