import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* ----------------------------------------------------------------- */
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPagesComponent } from './shared/pages/about-pages/about-pages.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutPagesComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
