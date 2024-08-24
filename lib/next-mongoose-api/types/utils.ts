import { type Document } from "mongoose";

export type ArrayToSingle<T> =
  T extends (infer U)[] ? U : T;

export type CombineKeys<T1, T2> =
  T1 extends string
    ? `${T1 & string}.${T2 & string}`
    : T2;

export type DocumentKey<
  T extends Document,
  K extends DocumentKeyOption<T>
> = DocumentKeyOption<Omit<T, K>>;

export type DocumentKeyOption<T> = keyof Omit<
  T,
  keyof Document
>;

export type DocumentKeyOptions<T> =
  DocumentKeyOption<T>[];

export type ExcludeUndefined<T> = Exclude<
  T,
  undefined
>;

export type ExtractDocument<T> = T extends
  | Document
  | Document[]
  ? T
  : never;

export type IsOptional<T> = undefined extends T
  ? true
  : false;
