import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from "./accounts/register/register.component";
import { LoginComponent } from "./accounts/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { PagesComponent } from "./pages/pages.component";
import { TransferComponent } from "./pages/transfer/transfer.component";
import { HomeComponent } from './home/home.component';
import { BillSummaryComponent } from "./pages/bill-summary/bill-summary.component";
import { BillComponent } from './pages/bill/bill.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } },

  // Pages links
  {
    path: 'customer', component: PagesComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'transfers', component: TransferComponent, data: { title: 'Transfers' } },
      { path: 'utility', component: BillComponent, data: { title: 'Pay Utility' } },
      { path: 'utility-summary', component: BillSummaryComponent, data: { title: 'Utility Summary' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
