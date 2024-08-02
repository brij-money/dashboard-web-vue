export default class CountryModel {
  /** @type {string} */
  id;
  /** @type {string} */
  name;
  /** @type {string} */
  abbreviation;
  /** @type {string} */
  code;
  /** @type {string} */
  currency;
  /** @type {string} */
  currency_symbol;
  /** @type {string} */
  flag_url;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.abbreviation = data.abbreviation;
    this.code = data.code;
    this.currency = data.currency;
    this.currency_symbol = data.currency_symbol;
    this.flag_url = data.flag_url;
  }
}
