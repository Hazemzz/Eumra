import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { DetailsCompanyComponent } from './components/details-company/details-company.component';
import { ListCompanyComponent } from './components/list-company/list-company.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'company', component: ListCompanyComponent },
  { path: 'company/:id', component: DetailsCompanyComponent },
  { path: 'add', component: AddCompanyComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
