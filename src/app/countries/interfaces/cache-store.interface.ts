import { Country } from './country';
import { Region } from './region.type';

export interface CacheStore {
    byCapital: Termcountries;
    byCountries: Termcountries;
    byRegion: RegionCountries;
}

export interface Termcountries {
    term: string;
    countries: Country[];
}
export interface RegionCountries {
    region: Region;
    countries: Country[];
}
