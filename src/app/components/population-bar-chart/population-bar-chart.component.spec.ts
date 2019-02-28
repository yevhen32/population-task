import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationBarChartComponent } from './population-bar-chart.component';

describe('PopulationBarChartComponent', () => {
  let component: PopulationBarChartComponent;
  let fixture: ComponentFixture<PopulationBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulationBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
