import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalSupervisionComponent } from './global-supervision/global-supervision.component';

const routes: Routes = [{
  path: '',
   // component: AddNewCompteComponent,
  children: [
    {
      path: 'etat-global',
      component: GlobalSupervisionComponent,
    },
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisionRoutingModule {
}
