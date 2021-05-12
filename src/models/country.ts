/** @format */

export interface ICity {
  name?: string;
  search?: string;
  lat?: number;
  lng?: number;
  country?: string;
  iso2?: string;
  iso3?: string;
  province?: string;
  capital?: string;
  population?: number;
}

export interface ICountry {
  name?: string;
  topLevelDomain?: string[];
  alpha2Code?: string;
  alpha3Code?: string;
  callingCodes?: string[];
  capital?: string;
  altSpellings?: string[];
  region?: string;
  subregion?: string;
  population?: number;
  latlng?: number[];
  demonym?: string;
  area?: number;
  gini?: number;
  timezones?: string[];
  borders?: string[];
  nativeName?: string;
  numericCode?: string;
  currencies?: ICurrency[];
  languages?: ILanguage[];
  translations?: ITranslations;
  flag?: string;
  regionalBlocs?: IRegionalBloc[];
  cioc?: string;
  cities?: ICity[];
}

export interface ICurrency {
  code?: string;
  name?: string;
  symbol?: string;
}

export interface ILanguage {
  iso639_1?: string;
  iso639_2?: string;
  name?: string;
  nativeName?: string;
}

export interface IRegionalBloc {
  acronym?: string[];
  name?: string;
  otherAcronyms?: string[];
  otherNames?: string[];
}

export interface ITranslations {
  de?: string;
  es?: string;
  fr?: string;
  ja?: string;
  it?: string;
  br?: string;
  pt?: string;
  nl?: string;
  hr?: string;
  fa?: string;
}
