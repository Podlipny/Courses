import { Component, OnInit } from '@angular/core';

import { Vehicle, VehicleService } from './vehicle.service';

@Component({
  moduleId: module.id,
  selector: 'story-vehicles',
   templateUrl: './vehicle-list.component.html',
  styles: [`
    .vehicles {list-style-type: none;}
    *.vehicles li {padding: 4px;cursor: pointer;}
  `]
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicles = [];
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }
}
