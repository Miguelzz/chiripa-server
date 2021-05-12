/** @format */
import { ICity, ICountry } from "./country";
import { Id, IImage, IApp } from "./shared";

export enum Gender {
  OTHER,
  FEMALE,
  MALE,
}

export enum TypeRegister {
  WHATSAPP,
  EMAIL,
  FACEBOOK,
  GOOGLE,
  PHONE,
}
export enum State {
  BEFORE_ACTIVE,
  ACTIVE,
  LOCKED,
  REMOVED,
}
export enum Sexual {
  ETERO,
  LESBIAN,
  GAY,
  BI,
  TRANSGENDER,
  TRANS,
  INTER,
  QUEER,
}

export interface IUser {
  id?: Id;
  app?: string;
  state?: State;
  typeRegister?: TypeRegister;
  names?: string;
  surnames?: string;
  email?: string;
  phone?: string;
  code?: number;
  prefix?: string;
  address?: string;
  gender?: Gender;
  authenticated?: boolean;
  secret?: string;
  facebookID?: string;
  googleID?: string;
  sexual?: Sexual;
  birthday?: Date;
  photo?: IImage;
  country?: ICountry | Id;
  city?: ICity | Id;
  apps?: IApp[];
}
