import { Component, EventEmitter } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}
  public searchByCapital(term: string): void {
    this.countriesService.searchCapital(term).subscribe(countries=>{
      this.countries = countries;
      console.log(countries);
    })
  }
}
