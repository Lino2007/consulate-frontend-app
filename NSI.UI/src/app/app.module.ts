import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {AccordionModule} from 'primeng/accordion';     // accordion and accordion tab
import {MenuItem} from 'primeng/api';                  // api

import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {RippleModule} from 'primeng/ripple';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NewsListComponent } from './public/news-list/news-list.component';
import { NewsItemComponent } from './public/news-item/news-item.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {CarouselModule} from 'primeng/carousel';
import {TabMenuModule} from 'primeng/tabmenu';

import { MsalInterceptor, MsalRedirectComponent, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalModule, MsalService, MSAL_INSTANCE, MsalInterceptorConfiguration, MsalGuardConfiguration, MsalGuard } from '@azure/msal-angular';
import { BrowserCacheLocation, Configuration, InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { HomeComponent } from './public/home/home.component';
import {NotifierModule} from 'angular-notifier';
import {AvatarModule} from 'primeng/avatar';
import {DropdownModule} from 'primeng/dropdown';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import { ProfileComponent } from './public/profile/profile.component';
import { AboutComponent } from './public/about/about.component';
import { ContactComponent } from './public/contact/contact.component';
import {GalleriaModule} from 'primeng/galleria';
import {CardModule} from 'primeng/card';
import { HomeMenuComponent } from './public/home-menu/home-menu.component';
import { FooterComponent } from './public/footer/footer.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      redirectUri: environment.appRedirectUri,
      authority: environment.loginRedirectUri,
      postLogoutRedirectUri: environment.appRedirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: false
    }
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    },
    loginFailedRoute: ''
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  environment.protected.forEach(element => {
    protectedResourceMap.set(element[0], [element[1]]);
  });
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}


@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsItemComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    AboutComponent,
    ContactComponent,
    HomeMenuComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        RadioButtonModule,
        RippleModule,
        TabViewModule,
        FormsModule,
        ReactiveFormsModule,
        NotifierModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CarouselModule,
        TabMenuModule,
        MsalModule,
        AvatarModule,
        DropdownModule,
        MegaMenuModule,
        MenubarModule,
        MenuModule,
        GalleriaModule,
        CardModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    MsalService,
    MsalGuard,
  ],
  bootstrap: [
    AppComponent,
    MsalRedirectComponent
  ]
})
export class AppModule { }
