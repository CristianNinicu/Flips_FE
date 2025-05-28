import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {AppRoutingModule, routes} from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {ManageCardsComponent} from './manage-cards/manage-cards.component';
import {QuizComponent} from './quiz-page/quiz-page.component';
import {ThemeService} from './theme.service';
import {FontFamilyService} from './font-family.service';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    LoginComponent,
    AppComponent,
    ManageCardsComponent,
    QuizComponent
  ],
  providers: [
    ThemeService,
    FontFamilyService
  ],
})
export class AppModule {}
