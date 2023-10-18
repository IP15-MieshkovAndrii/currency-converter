import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usdToUahRate: number = 0;
  eurToUahRate: number = 0;

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.usdToUahRate = parseFloat((this.exchangeRateService.rates['UAH'] / this.exchangeRateService.rates['USD']).toFixed(3));
    this.eurToUahRate = parseFloat(this.exchangeRateService.rates['UAH'].toFixed(3));
  }
}
