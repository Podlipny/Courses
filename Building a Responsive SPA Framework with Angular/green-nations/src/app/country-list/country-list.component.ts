import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppDataService } from '../services/app-data.service';
import { Country } from '../view-models/Country';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  allCountries: Array<Country>;
  count = 0;
  countries: Array<Country>;

  constructor(private dataService: AppDataService,
              private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.dataService.getCountries().subscribe(
      countries => {
        this.allCountries = countries;

        this.count = this.route.snapshot.params['count'];
        this.updateList();
      }
    );

    this.route.params.subscribe(params => {
      this.count = params['count'];
      this.updateList();
     });
  }

  updateList() {
    this.countries = this.count>0?this.allCountries.slice(0, this.count): this.allCountries;
  }
}

