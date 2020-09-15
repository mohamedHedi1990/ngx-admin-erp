import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SocietesComponent} from './societes/societes.component';
import {ListClientsComponent} from './list-clients/list-clients.component';
import {AddNewClientComponent} from './add-new-client/add-new-client.component';
import {ListFournisseursComponent} from './list-fournisseurs/list-fournisseurs.component';
import {AddNewProviderComponent} from './add-new-provider/add-new-provider.component';
import {ListComptesComponent} from './list-comptes/list-comptes.component';
import {AddNewCompteComponent} from './add-new-compte/add-new-compte.component';

const routes: Routes = [{
  path: 'account',
   component: AddNewCompteComponent,
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
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichierRoutingModule {
}
