import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

import { Population } from '../../models/population';
import { PopulationService } from '../../services/population.service';

@Component({
  selector: 'app-population-bar-chart',
  templateUrl: './population-bar-chart.component.html',
  styleUrls: ['./population-bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PopulationBarChartComponent implements OnInit {

  population: Population[];
  isLoading: boolean = false;

  constructor(
    private populationService: PopulationService
  ) { }

  getPopulation(): void {
    this.populationService.getPopulation().subscribe(population => {
      this.population = population.filter(item => item.age >= 18 && item.age <= 30);
      this.buildBarChart(this.population);
      this.isLoading = false;
    });
  }

  buildBarChart(data: Population[]): void {
    //TODO Make separate module for this
    var svg = d3.select("svg#pbch"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    /*var z = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);*/

      var keys = ['males', 'females', 'total'];

      x0.domain(data.map(function(d) { return d.age.toString(); }));
      x1.domain(keys).rangeRound([0, x0.bandwidth()]);
      y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

      g.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
          .attr("transform", function(d) { return "translate(" + x0(d.age.toString()) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
          .attr("x", function(d) { return x1(d.key); })
          .attr("y", function(d) { return y(d.value); })
          .attr("width", x1.bandwidth())
          .attr("height", function(d) { return height - y(d.value); })
          .attr("class", function(d) { return "bar-chart-" + d.key; });

      g.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x0))
        .append('text')
          .attr('x', (width + margin.left) / 2 )
          .attr('y', 30)
          .attr("fill", "#000")
          .attr('text-anchor', 'middle')
          .text('Age');

      g.append("g")
          .attr("class", "axis")
          .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
          .attr("x", 2)
          .attr("y", y(y.ticks().pop()) + 0.5)
          .attr("dy", "0.32em")
          .attr("fill", "#000")
          .attr("text-anchor", "start")
          .text("Population");

      var legend = g.append("g")
          .attr("font-size", 10)
          .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 19)
          .attr("width", 19)
          .attr("height", 19)
          .attr("class", function(d) { return "bar-chart-" + d; });

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9.5)
          .attr("dy", "0.32em")
          .text(function(d) { return d; });
  }

  ngOnInit() {
    this.getPopulation();
    this.isLoading = true;
  }

}
