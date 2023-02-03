import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VehicleService } from './vehicle.service';
import { VehiclesRoutingModule, routedComponents } from './vehicles-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, VehiclesRoutingModule],
  declarations: [routedComponents],
  providers: [VehicleService],
})
export class VehiclesModule { }
