import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-vehicles',
   templateUrl: './vehicles.component.html'
})
export class VehiclesComponent {
  vehicles = [
    { id: 1, name: 'X-Wing Fighter' },
    { id: 2, name: 'Tie Fighter' },
    { id: 3, name: 'Y-Wing Fighter' }
  ];
}
