import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListBonsLivraisonComponent } from "./list-bons-livraison/list-bons-livraison.component";
import { ListProduitsComponent } from "./list-produits/list-produits.component";
import {ListFacturesComponent} from "./list-factures/list-factures.component";

const routes: Routes = [{
    path: '',
    children: [
        {
            path: 'list-produits',
            component: ListProduitsComponent,
          },
          {
            path: 'list-bon-livraison',
            component: ListBonsLivraisonComponent,
          },
        {
          path: 'list-factures',
          component: ListFacturesComponent,
        },

    ],

  }];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class GestionCommercialRoutingModule {
  }
