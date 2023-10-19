import { Observable, of, share, tap, finalize } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Rates {
  [currencyCode: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService{
  private _rates: Rates = {};
  private cachedObservable: Observable<any> | null = null;
  constructor(private http: HttpClient) { }

  getRates() {
    const apiUrl = `http://data.fixer.io/api/latest?access_key=${environment.apiKey}`;
    let observable: Observable<any>;

    if (Object.keys(this._rates).length) {
      observable = of(this._rates);
    }  else if (this.cachedObservable) {
      observable = this.cachedObservable;
    } else {
      this.cachedObservable = this.http.get<any>(apiUrl)
        .pipe(
          tap(data => this._rates = data),
          share(),
          finalize(() => this.cachedObservable = null)
        );
      observable = this.cachedObservable;
    }

    return observable;
  }
}
