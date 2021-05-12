/** @format */

// // INTERSECCIONES

// type Merge = { a: string } | ({ b: string } & { c: string } & { d: string });

// const ac: Merge = { a: "", c: "" };

// if ("a" in ac) {
//   console.log(ac.a);
// } else {
//   console.log(ac.d);
// }

// // KEYOF

// interface Week {
//   monday: string;
//   tuesday: string;
//   wednesday: string;
//   thursday: string;
//   friday: string;
//   saturday: string;
//   sunday: string;
// }

// type Day = keyof Week;
// type Days = (keyof Week)[];

// const myDay: Day = "friday";
// const myDays: Days = ["friday", "saturday"];

// // INDEX TYPE

// const user = {
//   name: "miguel",
//   age: 29,
//   gender: true,
//   friends: ["camila", "lorena"],
//   birthday: new Date(),
// };

// type UserType = typeof user;

// // MAPPER TYPE

// interface ProductItem {
//   name: string;
//   price: number;
// }

// type Envolver<T> = {
//   [key in keyof T]: (arg: T[key]) => T[key];
// };

// const formatString = (str: string) => {
//   str = str.trim();
//   return str[0].toUpperCase() + str.substring(0);
// };

// const applyIVA = (price: number): number => price * 1.21;

// const transformation: Envolver<ProductItem> = {
//   name: formatString,
//   price: applyIVA,
// };

// const product: ProductItem = {
//   name: "    miguel  anGel       ",
//   price: 2000,
// };

// const evolve = <T extends object>(transformations: Envolver<T>, obj: T) => {
//   return Object.keys(obj).reduce<T>((result, key) => {
//     result[key] =
//       key in transformations ? transformations[key](obj[key]) : obj[key];
//     return result;
//   }, {} as T);
// };

//const updateProduct = evolve(transformation, product);

//console.log(updateProduct);

// TIPOS CONDICIONALES

// type DarkColors = "black" | "grey";
// type LightColors = "white" | "yellow";
// type Status = "darck" | "light";

// type Palette<T extends Status> = T extends "darck" ? DarkColors : LightColors;

// const palette: Palette<"darck"> = "black";

// // RECURSIVIDAD

// interface TreeNode<T> {
//   value: T;
//   children?: TreeNode<T>[];
// }

// const tree: TreeNode<string> = {
//   value: "ono",
//   children: [
//     {
//       value: "two",
//       children: [],
//     },
//   ],
// };

// type IterableList<T> = T & { next: IterableList<T> };

// interface Student {
//   name: string;
// }

// //const classList: IterableList<Student> = null;

// // READONLY

// interface State {
//   user: { name: string };
//   password: string;
// }

// type StateReadonly = Readonly<State>;
// type ArrayReadonly<T> = Readonly<Array<T>>;

// // PARTIAL READ

// interface Person {
//   name: string;
//   age: number;
//   other?: number;
// }

// type PartialState = Partial<Person>;

// // EXTRACT  & EXCLIDE

// type WeekDay =
//   | "monday"
//   | "tuesday"
//   | "wednesday"
//   | "thursday"
//   | "friday"
//   | "saturday"
//   | "sunday";

// type WorkDay = Exclude<WeekDay, "saturday" | "sunday">;
// type WorkEnd = Extract<WeekDay, "saturday" | "sunday">;

// type RecordWeek = Record<WeekDay, { hour: string; minutes: string }>;

// type ExcludePerson<A extends object, B extends object> = {
//   [key in Exclude<keyof A, keyof B>]: A[key];
// };

// type ExtractPerson<A extends object, B extends object> = {
//   [key in Extract<keyof A, keyof B>]: A[key];
// };

// const person: ExcludePerson<Person, { other: string }> = {
//   age: 45,
//   name: "camila",
// };

// type PickPerson = Pick<Person, "other">;
// const person2: ExtractPerson<Person, { other: string }> = {
//   other: 78,
// };

// // REQUIRED

// interface Coords {
//   x: number;
//   y: number;
//   z?: number;
// }

// type CordsRequired = Required<Coords>;
// // como es

// type MyRequired<T> = {
//   [key in keyof T]-?: T[key];
// };

// // UTILES TYPESCRIP

// type MyNonNullable = NonNullable<Person>;
// const myNonNullable: MyNonNullable = {
//   age: 45,
//   name: "",
// };

// type MyParameters = Parameters<(a: number, b: number) => {}>;
// type MyReturnType = ReturnType<(a: number, b: number) => { f: 45 }>;
// const myParameters: MyParameters = [1, 1];

// class Animal {
//   constructor(public animalName: string) {}
// }

// type MyConstructorParameters = ConstructorParameters<typeof Animal>;
// type MyInstanceType = InstanceType<typeof Animal>;

// const user2: MyInstanceType = {
//   animalName: "",
// };

// type Name = Capitalize<"perro">;
