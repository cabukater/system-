import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
    private http: HttpClient
  ) { }

  getDataChart(){
    return this.http.get('https://economia.awesomeapi.com.br/json/daily/USD-BRL/15')
      .pipe()

  }
}
