/** @format */

import mongoose, { Schema, Document } from "mongoose";
import { ICity, ICountry } from "../models/country";

export type ICountryRepository = ICountry & Document;
export type ICityRepository = ICity & Document;

const CitySchema = new Schema({
  name: String,
  search: String,
  lat: String,
  lng: String,
  country: String,
  iso2: String,
  iso3: String,
  province: String,
  capital: String,
  population: Number,
});

const CountrySchema = new Schema({
  name: String,
  topLevelDomain: [String],
  alpha2Code: String,
  alpha3Code: String,
  callingCodes: [String],
  capital: String,
  altSpellings: [String],
  region: String,
  subregion: String,
  population: Number,
  latlng: [Number],
  demonym: String,
  area: Number,
  gini: Number,
  timezones: [String],
  borders: [String],
  nativeName: String,
  numericCode: String,
  currencies: [
    {
      code: String,
      name: String,
      symbol: String,
    },
  ],
  languages: [
    {
      iso639_1: String,
      iso639_2: String,
      name: String,
      nativeName: String,
    },
  ],
  translations: {
    de: String,
    es: String,
    fr: String,
    ja: String,
    it: String,
    br: String,
    pt: String,
    nl: String,
    hr: String,
    fa: String,
  },
  flag: String,
  regionalBlocs: [
    {
      acronym: [String],
      name: [String],
      otherAcronyms: [String],
      otherNames: [String],
    },
  ],
  cioc: String,
  cities: [{ type: Schema.Types.ObjectId, ref: "City" }],
});

export const City = mongoose.model<ICityRepository>("City", CitySchema);
export const Country = mongoose.model<ICountryRepository>(
  "Country",
  CountrySchema
);
