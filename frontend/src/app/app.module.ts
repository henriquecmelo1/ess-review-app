import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { GaugeModule } from 'angular-gauge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { EditContentComponent } from './components/edit-content/edit-content.component';

import { FollowersListComponent } from './components/followerlist/follower-list.component';
import { FollowingListComponent } from './components/followinglist/following-list.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateContentComponent } from './components/create-content/create-content.component';
import { AuthInterceptor } from './services/interceptor';
import { MoviesComponent } from './components/movies/movies.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    CarouselComponent,
    ProfileComponent,
    UserHomeComponent,
    EditContentComponent,
    CreateContentComponent,
    MoviesComponent,
    EditAccountComponent,
  ],
  imports: [
    SlickCarouselModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    GaugeModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([
      {
        path:'', component :HomeComponent,
      },
      {
        path: 'auth/signin', component: LoginComponent,
      },
      {
        path: 'auth/signup', component: RegisterComponent,
      },
      {
        path: 'home/:id', component: UserHomeComponent,
      },
      {
        path: 'edit/:id', component: EditContentComponent,
      },
      {
        path: 'profile', component: ProfileComponent,
      },
      {
        path: 'search', component: SearchComponent,
      },
      {
        path: 'following', component: FollowingListComponent,
      },
      {
        path: 'followers', component: FollowersListComponent,
      },
      {
        path: 'edit', component: EditContentComponent,
      },
      {
        path: 'create-content', component: CreateContentComponent,
      },
      {
        path: 'movies', component: MoviesComponent,
      },
      {
        path: 'edit-account', component:EditAccountComponent,
      },
    ])
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
