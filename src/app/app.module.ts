import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarListComponent } from './pages/car-list/car-list.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CarDetailsComponent,
  ],
  imports: [
    CarListComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
