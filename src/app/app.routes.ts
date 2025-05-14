import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {ManageCardsComponent} from './manage-cards/manage-cards.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, // Default route
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'manage-cards', component: ManageCardsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
