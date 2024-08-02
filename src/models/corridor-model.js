import CountryModel from '@/models/country-model.js';

export default class CorridorModel {
  /** @type {CountryModel} */
  country;

  constructor(data) {
    this.country = new CountryModel(data.country);
  }
}
