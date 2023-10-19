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
    this.exchangeRateService.getRates().subscribe(({ rates }) => {
      this.usdToUahRate = parseFloat((rates['UAH'] / rates['USD']).toFixed(3));
      this.eurToUahRate = parseFloat(rates['UAH'].toFixed(3));
    })
  }
}
