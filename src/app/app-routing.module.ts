import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
//import { SignupComponent } from './components/signup/signup.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path:'home' , component: HomeComponent,canActivate: [AngularFireAuthGuard]},
 // { path:'signup', component: SignupComponent},
  { path:'login', component: LoginComponent},
  { path:'', component: HomeComponent,canActivate: [AngularFireAuthGuard]},
  { path:'**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
