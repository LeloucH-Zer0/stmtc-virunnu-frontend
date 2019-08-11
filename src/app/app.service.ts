import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  foodUrl = 'http://192.168.0.22:9090/virunnu/food'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  private extractData(res : Response) {
    let body = res;
    return body || { };
  }

  getFood() {
    return this.http.get(this.foodUrl+"/");
  }

  updateCount() {
    return this.http.get(this.foodUrl + "/count");
  }

  sellFoodItem(id, count) {
    return this.http.patch(this.foodUrl+ "/" + id, {
      "count" : count
    });
  }

  getFoodNames() {
    return this.http.get(this.foodUrl + "/names" );
  }
}


