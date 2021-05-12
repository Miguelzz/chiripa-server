/** @format */

import { Request } from "express";
import { ParamsDictionary, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";

export type Req<B> = Request<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
> & {
  userId?: string;
  body: B;
};

export type Res = Response<any, Record<string, any>, number>;

export type RouteParams<B extends object = {}> = (
  req: Req<B>,
  res: Res,
  next: any
) => void;

export type ErrorMessage = {
  message: string;
  errors: string[];
};
