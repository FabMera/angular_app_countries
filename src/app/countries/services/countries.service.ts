import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
    private apiUrl: string = 'https://restcountries.com/v3.1';

    constructor(private http: HttpClient) {}
    private getCountriesRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>(url).pipe(
            catchError((error) => {
                console.log(error.message);
                return of([]);
            })
        );
    }

    public searchCountryByAlphaCode(code: string): Observable<Country | null> {
        const url = `${this.apiUrl}/alpha/${code}`;
        return this.http.get<Country[]>(url).pipe(
            map((countries) => (countries.length > 0 ? countries[0] : null)),
            catchError(() => of(null))
        );
    }

    /* Buscar por Capital  */
    public searchCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;
        return this.getCountriesRequest(url);
    }

    /* Buscar por Región  */
    public searchRegion(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${term}`;
        return this.getCountriesRequest(url);
    }

    /* Buscar por Pais */
    public searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${term}`;
        return this.getCountriesRequest(url);
    }
}
