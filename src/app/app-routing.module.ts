import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* ----------------------------------------------------------------- */
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPagesComponent } from './shared/pages/about-pages/about-pages.component';
import { ContactComponent } from './shared/pages/contact-pages/contact/contact-pages.component';

const routes: Routes = [
  /* { path: '', component: HomePageComponent }, */
  { path: 'about', component: AboutPagesComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'countries',
    /* LoadChildren carga una promesa se obtiene la clase del modulo */
    loadChildren: () =>
      import('./countries/countries.module').then((m) => m.CountriesModule),
  },

  { path: '**', redirectTo: 'countries' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
