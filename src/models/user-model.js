import moment from 'moment';

import CorridorModel from '@/models/corridor-model.js';

export default class UserModel {
  /** @type {string} */
  id;
  /** @type {string} */
  firstname;
  /** @type {string} */
  lastname;
  /** @type {import('moment').Moment?} */
  dob;
  /** @type {string} */
  address;
  /** @type {string} */
  email;
  /** @type {string} */
  country_code;
  /** @type {string} */
  country_name;
  /** @type {string} */
  phone;
  /** @type {string?} */
  id_number;
  /** @type {string?} */
  gender;
  /** @type {number} */
  onboarding_stage;
  /** @type {import('moment').Moment?} */
  phone_verified_at;
  /** @type {string?} */
  merchant_env_config;
  /** @type {CorridorModel[]} */
  corridors;

  constructor(data) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.dob = !!data.dob ? moment(data.dob) : null;
    this.address = data.address;
    this.email = data.email;
    this.country_code = data.country_code;
    this.country_name = data.country_name;
    this.phone = data.phone;
    this.id_number = data.id_number;
    this.gender = data.gender;
    this.onboarding_stage = data.onboarding_stage;
    this.phone_verified_at = !!data.phone_verified_at ? moment(data.phone_verified_at) : null;
    this.merchant_env_config = data.merchant_env_config;
    this.corridors = data.corridors.map(corridor => new CorridorModel(corridor));
  }
}
