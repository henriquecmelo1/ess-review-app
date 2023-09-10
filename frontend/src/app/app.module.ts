import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from  '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {GaugeModule} from 'angular-gauge';
import { MatTabsModule} from '@angular/material/tabs';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    GaugeModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    RouterModule.forRoot([
      {
        path:'', component :HomeComponent,
      },
      {
        path: 'auth/signin', component: LoginComponent,
      },
      {
        path: 'auth/signup', component: RegisterComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
