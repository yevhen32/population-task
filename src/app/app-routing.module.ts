import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopulationComponent } from './components/population/population.component';
import { PopulationBarChartComponent } from './components/population-bar-chart/population-bar-chart.component';
import { LifeExpectancyCalculatorComponent } from './components/life-expectancy-calculator/life-expectancy-calculator.component';

const routes: Routes = [
  { path: '', component: PopulationComponent, pathMatch: 'full' },
  { path: 'population-bar-chart', component: PopulationBarChartComponent },
  { path: 'life-expectancy-calculator', component: LifeExpectancyCalculatorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
