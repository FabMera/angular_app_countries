import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
    selector: 'countries-by-region',
    templateUrl: './by-region-page.component.html',
    styles: [],
})
export class ByRegionPageComponent {
    public countries: Country[] = [];
    public regions: Region[] = [
        'africa',
        'americas',
        'asia',
        'europe',
        'oceania',
    ];
    public selectedRegion?: Region;

    constructor(private countriesService: CountriesService) {}
    public searchByRegion(region: Region): void {
        this.selectedRegion = region;
        this.countriesService.searchRegion(region).subscribe((countries) => {
            this.countries = countries;
            console.log(countries);
        });
    }
}
