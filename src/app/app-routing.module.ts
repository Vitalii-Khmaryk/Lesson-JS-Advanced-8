import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { RollsComponent } from './pages/product-category/rolls/rolls.component';
import { SetsComponent } from './pages/product-category/sets/sets.component';
import { DrinksComponent } from './pages/product-category/drinks/drinks.component';
import { SaucesComponent } from './pages/product-category/sauces/sauces.component';
import { DostavkaTaOplataComponent } from './dostavka/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutComponent } from './pages/about/about.component';

import { AdminComponent } from './admin/admin/admin.component';

import { ActionComponent } from './admin/action/action.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminTovarComponent } from './admin/admin-tovar/admin-tovar.component';
import { AdminZamovlenaComponent } from './admin/admin-zamovlena/admin-zamovlena.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'actions',component:DiscountComponent},
  {path:'product-category/rolls',component:RollsComponent},
  {path:'product-category/sets',component:SetsComponent},
  {path:'product-category/drinks',component:DrinksComponent},
  {path:'product-category/sauces',component:SaucesComponent},
  {path:'dostavka-ta-oplata',component:DostavkaTaOplataComponent},
  {path:'about-us',component:AboutComponent},
  {path:'admin',component:AdminComponent,children:[
    {path:'action',component:ActionComponent},
    {path:'category',component:AdminCategoryComponent},
    {path:'tovar',component:AdminTovarComponent},
    {path:'zamovlena',component:AdminZamovlenaComponent},
    {path: '',pathMatch: 'full',redirectTo: 'action'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
