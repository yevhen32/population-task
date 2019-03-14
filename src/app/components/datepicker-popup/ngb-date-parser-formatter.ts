import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return "";
    }
}

function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

// Formatter using "dd-MM-yyyy" string format:
@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (!value) { return null; }

    const parts = value.trim().split('-');
    
    return {
      day: parts.length > 0 ? parseInt(parts[0], 10) : null,
      month: parts.length > 1 ? parseInt(parts[1], 10) : null,
      year: parts.length > 2 ? parseInt(parts[2], 10) : null,
    };
  }

  format(date: NgbDateStruct): string {
    const pad = (n) => Number.isInteger(n) ? ('0' + n).substr(-2) : '';
    return date ? `${pad(date.day)}-${pad(date.month)}-${date.year}` : '';
  }
}