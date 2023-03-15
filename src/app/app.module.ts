import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { RollsComponent } from './pages/product-category/rolls/rolls.component';
import { SetsComponent } from './pages/product-category/sets/sets.component';
import { DrinksComponent } from './pages/product-category/drinks/drinks.component';
import { SaucesComponent } from './pages/product-category/sauces/sauces.component';
import { DostavkaTaOplataComponent } from './dostavka/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutComponent } from './pages/about/about.component';
import { ActionComponent } from './admin/action/action.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminTovarComponent } from './admin/admin-tovar/admin-tovar.component';
import { AdminZamovlenaComponent } from './admin/admin-zamovlena/admin-zamovlena.component';
import { AdminComponent } from './admin/admin/admin.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DiscountComponent,
    RollsComponent,
    SetsComponent,
    DrinksComponent,
    SaucesComponent,
    DostavkaTaOplataComponent,
    AboutComponent,
    ActionComponent,
    AdminCategoryComponent,
    AdminTovarComponent,
    AdminZamovlenaComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
