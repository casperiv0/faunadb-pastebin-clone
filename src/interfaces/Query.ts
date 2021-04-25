import { Ref } from "faunadb";

export type QueryData<T> = {
  ref: {
    id: string;
  };
  data: T;
};
