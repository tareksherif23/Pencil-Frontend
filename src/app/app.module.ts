import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import {FormsModule} from '@angular/forms';
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignupinComponent } from './components/signupin/signupin.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateComponent } from './components/create/create.component';
import { MeditComponent } from './components/medit/medit.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupinComponent,
    NotfoundComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    CreateComponent,
    MeditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA-2ni31iOxYvw846wMJwMClqVSO5lmb6M",
      authDomain: "pencil-ba6b7.firebaseapp.com",
      databaseURL: "https://pencil-ba6b7.firebaseio.com",
      projectId: "pencil-ba6b7",
      storageBucket: "pencil-ba6b7.appspot.com",
      messagingSenderId: "483426535468",
      appId: "1:483426535468:web:376e4862874205cde36989",
      measurementId: "G-JGKCQVXDWJ"
    }),
    FormsModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
