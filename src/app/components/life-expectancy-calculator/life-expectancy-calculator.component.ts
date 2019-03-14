import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

import { NgbDate, NgbDateStruct, NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Countries } from '../../models/countries';
import { CountriesService } from '../../services/countries.service';
import { RemainingLifeExpectancy } from '../../models/RemainingLifeExpectancy';
import { RemainingLifeExpectancyService } from '../../services/remainingLifeExpectancy.service';

@Component({
  selector: 'app-life-expectancy-calculator',
  templateUrl: './life-expectancy-calculator.component.html',
  styleUrls: ['./life-expectancy-calculator.component.css']
})

export class LifeExpectancyCalculatorComponent implements OnInit {

  countries: Countries[];
  countryFieldDisabled = true;

  calculatorForm: FormGroup;
  submitted = false;
  success = false;

  datepickerConfig = {
    date: {
      minDate: {year: 1955, month: 1, day: 1},
      maxDate: {year: 2094, month: 12, day: 31}
    },
    age: {
      minDate: {year: 1945, month: 1, day: 1},
      maxDate: {year: 2055, month: 12, day: 31}
    }
  }

  datepickerDateMin = new Date(this.datepickerConfig.date.minDate.year, this.datepickerConfig.date.minDate.month - 1, this.datepickerConfig.date.minDate.day);
  datepickerDateMax = new Date(this.datepickerConfig.date.maxDate.year, this.datepickerConfig.date.maxDate.month - 1, this.datepickerConfig.date.maxDate.day);

  remainingLifeExpectancy: RemainingLifeExpectancy;
  isLoading: boolean = false;

  constructor(
    private countriesService: CountriesService,
    private formBuilder: FormBuilder,
    private remainingLifeExpectancyService: RemainingLifeExpectancyService,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {}

  initForm(): void {
    this.calculatorForm = this.formBuilder.group({
      sex: ['', Validators.required],
      country: [{value: '', disabled: this.countryFieldDisabled}, Validators.required],
      date: ['', Validators.required],
      age: ['', [Validators.required]], //this.ageValidator
    })
  }

  getCountries(): void {
    this.countriesService.getCountries().subscribe(
      (countries: Countries[]) => {
        this.countries = countries['countries'];
        this.countryFieldDisabled = false;
        this.calculatorForm.controls['country'].enable();
      }
    );
  }

  getRemainingLifeExpectancy(): void {
    const params: string[] = [
      this.calculatorForm.controls.sex.value,
      this.calculatorForm.controls.country.value,
      this.ngbDateParserFormatter.format(this.calculatorForm.controls.date.value),
      this.calculatorForm.controls.age.value //this.ngbDateParserFormatter.format(this.calculatorForm.controls.age.value)
    ];
    
    this.remainingLifeExpectancyService.formApiURL(params);
    this.remainingLifeExpectancyService.getRemainingLifeExpectancy().subscribe(
      remainingLifeExpectancy => {
        this.remainingLifeExpectancy = remainingLifeExpectancy;
        this.isLoading = false;
        this.success = true;
        this.calculatorForm.reset();
        console.log(this.remainingLifeExpectancy);
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    const controls = this.calculatorForm.controls;
    if (this.calculatorForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    
    this.getRemainingLifeExpectancy();
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.calculatorForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  /* private ageValidator(control: FormControl): ValidationErrors {
    let value = control.value;
    
    let y = '';
    let m = '';
    let d = '';

    // console.log(value);

    let yPos = value.indexOf('y');
    if (yPos) {
      y = value.substring(0, yPos);
      value = value.substr(yPos+1);
    } else {
      yPos = 0;
    }

    let mPos = value.indexOf('m');
    if (mPos) {
      m = value.substring(0, mPos);
      value = value.substr(mPos+1);
    } else {
      mPos = 0;
    }

    let dPos = value.indexOf('d');
    if (dPos) {
      d = value.substring(0, dPos);
    }

    // console.log(value);
    // console.log('y', y, '|', 'm', m, '|', 'd', d);
    // let age = y;

    const ageValid = true;
   
    if (!ageValid) {
     return { invalidPassword: 'Invalid value.' };
    }
     return null;
  } */

  ngOnInit() {
    this.getCountries();
    this.initForm();
  }

}
