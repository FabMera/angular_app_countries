import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, delay } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
        byCapital: { term: '', countries: [] },
        byCountries: { term: '', countries: [] },
        byRegion: { region: '', countries: [] },
    };

    constructor(private http: HttpClient) {}
    //getCountriesRequest sirve para no repetir codigo y retornar un observable.
    private getCountriesRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>(url).pipe(
            catchError((error) => {
                console.log(error.message);
                delay(1500);
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
        return this.getCountriesRequest(url).pipe(
            tap(
                (countries) =>
                    (this.cacheStore.byCapital = {
                        term: term,
                        countries: countries,
                    })
            )
        );
    }

    /* Buscar por Región  */
    public searchRegion(region: Region): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${region}`;
        return this.getCountriesRequest(url).pipe(
            tap(
                (countries) =>
                    (this.cacheStore.byRegion = { region, countries })
            )
        );
    }

    /* Buscar por Pais */
    public searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${term}`;
        return this.getCountriesRequest(url).pipe(
            tap(
                (countries) =>
                    (this.cacheStore.byCountries = {
                        term,
                        countries,
                    })
            )
        );
    }
}
