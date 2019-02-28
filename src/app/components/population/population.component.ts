import { Component, OnInit } from '@angular/core';

import { Population } from '../../models/population';
import { PopulationService } from '../../services/population.service';

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.css']
})
export class PopulationComponent implements OnInit {

  population: Population[];
  isLoading: boolean = false;

  constructor(
    private populationService: PopulationService
  ) { }

  getPopulation(): void {
    this.populationService.getPopulation().subscribe(population => {
      this.population = population.filter(item => item.age >= 18 && item.age <= 30)
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getPopulation();
    this.isLoading = true;
  }

}
