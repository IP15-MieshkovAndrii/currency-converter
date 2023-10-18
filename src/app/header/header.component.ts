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
    this.exchangeRateService.fetchExchangeRates().subscribe((data: any) => {
      const usdToUahRate = (data.rates.UAH / data.rates.USD).toFixed(3);
      const eurToUahRate = data.rates.UAH.toFixed(3);
    
      this.usdToUahRate = parseFloat(usdToUahRate);
      this.eurToUahRate = parseFloat(eurToUahRate);
    });
  }
}
