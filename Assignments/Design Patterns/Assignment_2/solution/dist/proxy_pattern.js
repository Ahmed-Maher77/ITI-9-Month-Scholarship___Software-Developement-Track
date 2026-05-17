class Country {
    name;
    constructor(name) {
        this.name = name;
    }
}
class CountryProxy {
    country;
    static cache = {};
    constructor(country) {
        this.country = country;
    }
    getCountry() {
        const key = this.country.name;
        if (!CountryProxy.cache[key]) {
            console.log('not found in cache');
            CountryProxy.cache[key] = new Country(key);
        }
        return CountryProxy.cache[key];
    }
}
// client code
const countryProxy = new CountryProxy(new Country("Egypt"));
console.log(countryProxy.getCountry());
const countryProxy2 = new CountryProxy(new Country("Egypt"));
console.log(countryProxy2.getCountry());
export {};
// ==================== alternative => singleton (BONUS) ====================
/*
class CountryCache {
    private static instance: CountryCache;
    private countries: string[] = [];

    private constructor() {}

    static getInstance() {
        if (!CountryCache.instance) {
            CountryCache.instance = new CountryCache();
        }

        return CountryCache.instance;
    }

    setCountries(countries: string[]) {
        this.countries = countries;
    }

    getCountries() {
        return this.countries;
    }
}
*/ 
//# sourceMappingURL=proxy_pattern.js.map