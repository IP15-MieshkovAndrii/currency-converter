import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  constructor(private http: HttpClient) { }

  fetchExchangeRates() {
    const apiUrl = `http://data.fixer.io/api/latest?access_key=${environment.apiKey}`;
    return this.http.get(apiUrl);
  }
}
