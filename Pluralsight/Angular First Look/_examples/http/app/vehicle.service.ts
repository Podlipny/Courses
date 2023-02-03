import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class Vehicle {
  constructor(public id: number, public name: string) { }
}

@Injectable()
export class VehicleService {
  constructor(private http: Http) { }

  getVehicles() {
    return this.http
      .get('api/vehicles.json')
      .map((response: Response) => <Vehicle[]>response.json().data)
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`; //bacha jedna se backticks
    return Observable.throw(msg); //jelikoz v Subscribe cekame Observable, tak musime pouzit Observable
  }
}
