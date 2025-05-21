import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {ManageCardsComponent} from './manage-cards/manage-cards.component';
import {LayoutComponent} from './layout.compoment';
import {QuizComponent} from './quiz-page/quiz-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'home', component: HomePageComponent},
      {path: 'about', component: AboutPageComponent},
      {path: 'manage-cards', component: ManageCardsComponent},
      {path: 'quiz', component: QuizComponent},
    ]
  },
  // Add 404 redirect or page here if needed
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
