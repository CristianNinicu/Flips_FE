import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {AppRoutingModule, routes} from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {CardManagerComponent} from './manage-cards/manage-cards.component';

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
    CardManagerComponent
  ],
  providers: [],
})
export class AppModule {}
