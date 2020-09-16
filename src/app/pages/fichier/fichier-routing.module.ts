import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SocietesComponent} from './societes/societes.component';
import {ListClientsComponent} from './list-clients/list-clients.component';
import {AddNewClientComponent} from './add-new-client/add-new-client.component';
import {ListFournisseursComponent} from './list-fournisseurs/list-fournisseurs.component';
import {AddNewProviderComponent} from './add-new-provider/add-new-provider.component';
import {ListComptesComponent} from './list-comptes/list-comptes.component';
import {AddNewCompteComponent} from './add-new-compte/add-new-compte.component';
import {ListeTarifsBancaireComponent} from './liste-tarifs-bancaire/liste-tarifs-bancaire.component';
import {AddNewEchanchierComponent} from './add-new-echanchier/add-new-echanchier.component';
import {ListeEchenaciersComponent} from './liste-echenaciers/liste-echenaciers.component';

const routes: Routes = [{
  path: '',
   // component: AddNewCompteComponent,
  children: [
    {
      path: 'societes',
      component: SocietesComponent,
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
      path: 'tarifs-bancaires',
      component: ListeTarifsBancaireComponent,
    },
    {
      path: 'echeanciers',
      component: ListeEchenaciersComponent,
    },
    {
      path: 'comptes',
      component: ListComptesComponent,
    },
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichierRoutingModule {
}
