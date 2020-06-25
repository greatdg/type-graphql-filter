import { GraphQLScalarType } from "graphql";
import { FilterOperator } from ".";
export declare type ReturnTypeFunc = (type?: void) => GraphQLScalarType | Function;
export declare type FilterOptions = {
    aliasTable?: string;
};
export declare type FiltersCollectionType = {
    target: Function;
    field: string | symbol;
    operators: FilterOperator[];
    getReturnType?: ReturnTypeFunc;
    options?: FilterOptions;
};
export declare type MetadataStorage = {
    filters: FiltersCollectionType[];
};
