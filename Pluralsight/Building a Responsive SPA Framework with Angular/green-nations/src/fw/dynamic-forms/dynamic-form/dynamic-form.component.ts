import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FieldDefinition } from '../field-definition';

@Component({
  selector: 'fw-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnChanges, OnInit {
  // OnChanges se vola pokud se zmeni nejaky paramater (input) componenty

  @Input() vm: any;
  @Input() vmDefinition: Array<FieldDefinition>;
  @Input() operation: string;
  @Input() errorMessage: string; //idealni je take predavat error message pres FieldDefinition pro jednotlive pole
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();
  
  form: FormGroup;
  status: string;
  submitted = false;
  vmCopy: any;
  
  // location - pohyv v DOM - back, refresh
  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }
  
  clearForm() {
    let group = {};
    this.vmCopy = Object.assign({}, this.vm); // immutable pristup
    // dynamicky vytvorime form - pokud chceme form vycistit, jakoby ho znovu vytvorime
    this.vmDefinition.forEach(field => {
      group[field.key] = field.required ? new FormControl(this.vmCopy[field.key], Validators.required)
                                              : new FormControl(this.vmCopy[field.key]);
    });
    this.form = new FormGroup(group);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errorMessage'].currentValue && this.status === 'waiting') {
       this.status = "";
     }
  }

  ngOnInit() {
    this.clearForm();
    
    // pokud se zmeni parametr routy, tak chceme aby se prekreslil form
    // muze se stat ze se zmeni routea a componenta se neprekresly - napriklad se zmeni parametr v route
    this.route.params.subscribe(params => {
      this.operation = params['operation'];
      this.clearForm();
     });
  }

  onBack() {
    this.errorMessage = null;
    this.location.back();
  }

  onCancel() {
    this.onBack();
  }

  onCreate() {
    this.submitted = true;
    if (this.form.valid) {
      this.status = 'waiting';
      this.create.emit(this.form.value);
    }
  }

  onEdit() {
    // pokud jsme na detail, tak je nase routa localhost:4200/authentication/country-detail/1/detail
    // chceme jit s stupen vyse localhost:4200/authentication/country-detail/1/ a pridat edit
    this.router.navigate(['../', 'edit'], { relativeTo: this.route});
  }

  onSave() {
    this.submitted = true;
    if (this.form.valid) {
      this.status = 'waiting';
      this.update.emit(this.form.value); // zavola predanou eventu z country-detail.component
    }
  }
}
