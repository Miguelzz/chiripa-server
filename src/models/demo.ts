/** @format */

export interface IImage {
  public_id: string;
  url: string;
  secure_url: string;
}

export interface IDemo {
  tags: string[];
  title: string;
  images: IImage[];
  description: string;
}
