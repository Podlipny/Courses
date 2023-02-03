import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id, // Typescript nezna module id, ale vyrvari nam ho System.Js
  selector: 'app-customer', // <app-customer>
  templateUrl: 'customer.component.html'
})
export class CustomerComponent implements OnInit {
  @Input() customer: { id: number, name: string };

  myColour = 'gray';

  ngOnInit() {  }
}

