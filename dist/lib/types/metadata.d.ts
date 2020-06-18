import { GraphQLScalarType } from "graphql";
import { FilterOperator } from ".";
export declare type ReturnTypeFunc = (type?: void) => GraphQLScalarType | Function;
export declare type FiltersCollectionType = {
    target: Function;
    field: string | symbol;
    operators: FilterOperator[];
    getReturnType?: ReturnTypeFunc;
};
export declare type MetadataStorage = {
    filters: FiltersCollectionType[];
};
