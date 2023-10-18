import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';
interface Rates {
  [currencyCode: string]: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  amount1: number = 0;
  currency1: string = 'UAH';
  amount2: number = 0;
  currency2: string = 'UAH';
  rates: Rates = {
    "USD": 38,
    "EUR": 40,
    "UAH": 1,
  };
  singleRate: number = 1;

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRateService.fetchExchangeRates().subscribe((data: any) => {
      this.rates = data.rates
    });
  }

  convertCurrency(conversionType: number) {
    if (conversionType === 1) {
      this.amount2 = this.convert(this.amount1, this.currency1, this.currency2);
    } else if (conversionType === 2) {
      this.amount1 = this.convert(this.amount2, this.currency2, this.currency1);
    }
  }

  convert(amount: number, fromCurrency: string, toCurrency: string): number {
    this.singleRate = parseFloat((this.rates[toCurrency] / this.rates[fromCurrency]).toFixed(5));
    let convertation = (amount * this.rates[toCurrency]) / this.rates[fromCurrency]

    return convertation;
  }

  exchangeCurrencies() {
    const tempCurrency = this.currency1;
    this.currency1 = this.currency2;
    this.currency2 = tempCurrency;
    this.convertCurrency(1);
  }
}
