"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFilterType = void 0;
const type_graphql_1 = require("type-graphql");
const getMetadataStorage_1 = require("type-graphql/dist/metadata/getMetadataStorage");
const getMetadataStorage_2 = require("../metadata/getMetadataStorage");
const types_1 = require("../types");
/**
 * Generate a type-graphql InputType from a @ObjectType decorated
 * class by calling the @InputType and @Field decorators
 *
 * This should be used to generate the type of the @Arg
 * decorator on the corresponding resolver.
 *
 * @param type
 */
exports.generateFilterType = (type) => {
    const metadataStorage = getMetadataStorage_2.getMetadataStorage();
    const filtersData = metadataStorage.filters.filter((f) => f.target === type);
    const typeGraphQLMetadata = getMetadataStorage_1.getMetadataStorage();
    const objectTypesList = typeGraphQLMetadata.objectTypes;
    const graphQLModel = objectTypesList.find((ot) => ot.target === type);
    if (!graphQLModel) {
        throw new Error(`Please decorate your class "${type}" with @ObjectType if you want to filter it`);
    }
    // Create a new empty class with the "<graphQLModel.name>Condition" name
    const conditionTypeName = graphQLModel.name + "Condition";
    const conditionTypeContainer = {
        [conditionTypeName]: class {
        },
    };
    // Call the @InputType decorator on that class
    type_graphql_1.InputType()(conditionTypeContainer[conditionTypeName]);
    // Simulate creation of fields for this class/InputType by calling @Field()
    for (const { field, operators, getReturnType } of filtersData) {
        // When dealing with methods decorated with @Field, we need to lookup the GraphQL
        // name and use that for our filter name instead of the plain method name
        const graphQLField = typeGraphQLMetadata.fieldResolvers.find((fr) => fr.target === type && fr.methodName === field);
        const fieldName = graphQLField ? graphQLField.schemaName : field;
        type_graphql_1.Field(() => types_1.BaseOperator, { nullable: true })(conditionTypeContainer[conditionTypeName].prototype, "operator");
        for (const operator of operators) {
            const baseReturnType = typeof getReturnType === "function" ? getReturnType() : String;
            const returnTypeFunction = types_1.ARRAY_RETURN_TYPE_OPERATORS.includes(operator)
                ? () => [baseReturnType]
                : () => baseReturnType;
            type_graphql_1.Field(returnTypeFunction, { nullable: true })(conditionTypeContainer[conditionTypeName].prototype, `${String(fieldName)}_${operator}`);
        }
    }
    // Extend the Condition type to create the final Filter type
    const filterTypeName = graphQLModel.name + "Filter";
    const filterTypeContainer = {
        [filterTypeName]: class extends conditionTypeContainer[conditionTypeName] {
        },
    };
    type_graphql_1.InputType()(filterTypeContainer[filterTypeName]);
    type_graphql_1.Field(() => [conditionTypeContainer[conditionTypeName]], {
        nullable: true,
    })(filterTypeContainer[filterTypeName].prototype, "conditions");
    return () => filterTypeContainer[filterTypeName];
};
//# sourceMappingURL=generateFilterType.js.map