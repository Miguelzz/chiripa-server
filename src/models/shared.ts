/** @format */

import { Schema } from "mongoose";

export type Id = Schema.Types.ObjectId;
export type Ids = Schema.Types.ObjectId[];

export interface Input {
  idUser?: Id;
  token?: string;
  phone?: string;
}

export interface IImage {
  public_id: string;
  url: string;
  secure_url: string;
}

export enum AppName {
  IDENTITY,
  CHIRIPA, // RIFAS DE PRODUCTOS
  MERCAKY, // MERCAR
}

export interface IApp {
  name: AppName;
  roles: number[];
}

enum ResultState {
  OK,
  VALIDATE,
  ERROR,
}

interface Validations {
  [key: string]: string;
}

interface Errors {
  [key: string]: string;
}

export interface Message<T> {
  status: ResultState;
  validations: Validations;
  errors: Errors;
  data: T;
}

export enum RoleType {
  USER,
  ADMIN,
  MODERATOR,
}
export interface IRole {
  type: RoleType;
  versionKey: boolean;
}
