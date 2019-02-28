import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MessagesComponent } from './components/messages/messages.component';
import { PopulationComponent } from './components/population/population.component';
import { PopulationBarChartComponent } from './components/population-bar-chart/population-bar-chart.component';
import { LifeExpectancyCalculatorComponent } from './components/life-expectancy-calculator/life-expectancy-calculator.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    PopulationComponent,
    PopulationBarChartComponent,
    LifeExpectancyCalculatorComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
