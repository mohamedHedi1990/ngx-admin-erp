import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {FichierModule} from './fichier/fichier.module';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    FichierModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
