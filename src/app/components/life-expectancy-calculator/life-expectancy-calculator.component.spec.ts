import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeExpectancyCalculatorComponent } from './life-expectancy-calculator.component';

describe('LifeExpectancyCalculatorComponent', () => {
  let component: LifeExpectancyCalculatorComponent;
  let fixture: ComponentFixture<LifeExpectancyCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeExpectancyCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeExpectancyCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
