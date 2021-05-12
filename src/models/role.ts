/** @format */
export enum RoleType {
  USER,
  ADMIN,
  MODERATOR,
}
export interface IRole {
  type: RoleType;
  versionKey: boolean;
}
