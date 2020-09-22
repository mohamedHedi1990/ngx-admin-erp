import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListeFacturesFournisseursComponent} from './liste-factures-fournisseurs/liste-factures-fournisseurs.component';

const routes: Routes = [{
  path: '',
   // component: AddNewCompteComponent,
  children: [
    {
      path: 'factures-clients',
      // component: ListSocietesComponent,
    },
    {
      path: 'factures-fournisseurs',
      component: ListeFacturesFournisseursComponent,
    },
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturesRoutingModule {
}
