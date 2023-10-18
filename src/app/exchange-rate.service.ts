import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Rates {
  [currencyCode: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private _rates: Rates = {};
  constructor(private http: HttpClient) { }

  get rates() {
    const apiUrl = `http://data.fixer.io/api/latest?access_key=${environment.apiKey}`;

    if (!Object.keys(this._rates).length) {
      this.http.get(apiUrl).subscribe((data: any) => this._rates = data.rates);
    }

    return this._rates
  }
}
