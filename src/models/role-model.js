import PermissionModel from '@/models/permission-model.js';

export default class RoleModel {
  /** @type {string} */
  name;
  /** @type {string?} */
  display_name;
  /** @type {string?} */
  description;
  /** @type {string?} */
  original_name;
  /** @type {PermissionModel[]} */
  permissions;

  constructor(data) {
    this.name = data.name;
    this.display_name = data.display_name;
    this.description = data.description;
    this.original_name = data.original_name;
    this.permissions = data.permissions.map(permission => new PermissionModel(permission));
  }
}
