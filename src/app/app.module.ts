import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';

import { HttpClientModule } from '@angular/common/http';
import { CarListComponent } from './pages/car-list/car-list.component';

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
