import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  navLinks = [];

  public isCollapsed = false;

  constructor() { }

  ngOnInit() {

    // Main nav links
    this.navLinks = [
      { 'url': '/', 'text': 'Population' },
      { 'url': '/population-bar-chart', 'text': 'Population bar chart' },
      { 'url': '/life-expectancy-calculator', 'text': 'Life expectancy calculator' },
    ];
    
  }

}
