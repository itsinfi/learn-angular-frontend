import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailsComponent } from './car-list/car-details/car-details.component';
import { DataBaseService } from './db/data-base.service';

export function initDB() {
  return () => {
    DataBaseService.init()
    return Promise.resolve()
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initDB,
      multi: true},
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
