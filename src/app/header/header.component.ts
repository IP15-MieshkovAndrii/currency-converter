import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usdToUahRate: number = 0;
  eurToUahRate: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    const apiUrl = `http://data.fixer.io/api/latest?access_key=${environment.apiKey}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      const usdToUahRate = (data.rates.UAH / data.rates.USD).toFixed(3);
      const eurToUahRate = data.rates.UAH.toFixed(3);
    
      this.usdToUahRate = parseFloat(usdToUahRate);
      this.eurToUahRate = parseFloat(eurToUahRate);
    });
  }
}
