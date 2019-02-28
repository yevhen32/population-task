import { Component, OnInit } from '@angular/core';

import { Countries } from '../../models/countries';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-life-expectancy-calculator',
  templateUrl: './life-expectancy-calculator.component.html',
  styleUrls: ['./life-expectancy-calculator.component.css']
})
export class LifeExpectancyCalculatorComponent implements OnInit {

  countries: Countries[];

  constructor(
    private countriesService: CountriesService
  ) { }

  getCountries(): void {
    this.countriesService.getCountries().subscribe((countries: Countries[]) => this.countries = countries['countries']);
  }

  onSubmit(): void {
    alert('I am sorry, this part doesn\'t work');
    return;
  }

  ngOnInit() {
    this.getCountries();
  }

}
