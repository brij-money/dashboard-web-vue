export default class PermissionModel {
  /** @type {string} */
  name;
  /** @type {string?} */
  display_name;
  /** @type {string?} */
  description;

  constructor(data) {
    this.name = data.name;
    this.display_name = data.display_name;
    this.description = data.description;
  }
}
