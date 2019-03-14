import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDatepickerConfig, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from "./ngb-date-parser-formatter"

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './datepicker-popup.component.html',
  styleUrls: ['./datepicker-popup.component.css'],
  // providers: [NgbDatepickerConfig] // add NgbDatepickerConfig to the component providers
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]
})
export class NgbdDatepickerPopup implements OnInit {

  model: NgbDateStruct;
  today = this.calendar.getToday();
  @Input() id: string;
  @Input() minDate: NgbDateStruct;
  @Input() maxDate: NgbDateStruct;
  @Input() parentFormGroup: FormGroup;
  @Input() parentFormControlName: string;
  
  constructor(private calendar: NgbCalendar) {}

  onDateSelect(e) {
    this.model = e;
  }

  setToday() {
    const today = this.today;
    this.model = today;
    this.parentFormGroup.controls[this.parentFormControlName].setValue(today);
  }

  ngOnInit() {

  }
}