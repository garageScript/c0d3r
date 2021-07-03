import { z } from "zod";

export type ZodShape<T> = {
  [key in keyof T]-?: undefined extends T[key]
    ? z.ZodOptionalType<z.ZodType<T[key]>>
    : z.ZodType<T[key]>;
};
