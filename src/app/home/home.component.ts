import { Component, OnInit } from '@angular/core';
import { ExchangeRateService, Rates } from '../exchange-rate.service';

enum ConversionDirection {
  FROM,
  TO
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  amountFrom: number = 0;
  currencyFrom: string = 'UAH';
  amountTo: number = 0;
  currencyTo: string = 'USD';
  currentRate: number = 0;
  rates: Rates = {};

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRateService.getRates().subscribe((data: any) => {
      this.rates = data.rates;
      this.updateCurrentRate();
    });
  }

  updateCurrentRate () {
    this.currentRate = parseFloat((this.rates[this.currencyTo] / this.rates[this.currencyFrom]).toFixed(5));
  }

  convertCurrency(conversionDirection: ConversionDirection) {
    if (conversionDirection === ConversionDirection.FROM) {
      this.amountTo = Math.abs(this.amountFrom) * this.rates[this.currencyTo] / this.rates[this.currencyFrom];
    } else if (conversionDirection === ConversionDirection.TO) {
      this.amountFrom = Math.abs(this.amountTo) * this.rates[this.currencyFrom] / this.rates[this.currencyTo];
    }
    this.updateCurrentRate();
  }

  validateAmount(property: 'amountFrom' | 'amountTo') {
    if (this[property] < 0) {
      this[property] = 0;
    }
  }

  toggleCurrencies() {
    const tempCurrency = this.currencyFrom;
    const tempAmount = this.amountFrom;

    this.currencyFrom = this.currencyTo;
    this.currencyTo = tempCurrency;
    this.amountFrom = this.amountTo;
    this.amountTo = tempAmount;
    this.updateCurrentRate();
  }

  onKeyDown(event: KeyboardEvent): void {
    const disallowedKeys = ["e", "E", "+", "-"];

    if (disallowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
