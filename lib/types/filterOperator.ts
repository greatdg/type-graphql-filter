export type FilterOperator =
  | "lt"
  | "gt"
  | "lte"
  | "gte"
  | "eq"
  | "ne"
  | "in"
  | "relation_in"
  | "like"
  | "likeAny";

export const ARRAY_RETURN_TYPE_OPERATORS: FilterOperator[] = [
  "relation_in",
  "in",
  "likeAny",
];
