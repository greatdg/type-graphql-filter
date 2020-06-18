"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = __importDefault(require("expect"));
const graphql_1 = require("graphql");
const type_graphql_1 = require("type-graphql");
const helpers_1 = require("../../lib/helpers");
const decorators_1 = require("../../lib/decorators");
describe("generateFilterType", () => {
    let schemaIntrospection;
    before(async () => {
        let FilterableType = class FilterableType {
            getPurpose() {
                return "some purpose";
            }
        };
        __decorate([
            type_graphql_1.Field(type => type_graphql_1.Int),
            decorators_1.Filter(["lt", "gt"], type => type_graphql_1.Int),
            __metadata("design:type", Number)
        ], FilterableType.prototype, "amount", void 0);
        __decorate([
            type_graphql_1.Field(type => String, { name: "purpose" }),
            decorators_1.Filter(["eq", "like"]),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", String)
        ], FilterableType.prototype, "getPurpose", null);
        FilterableType = __decorate([
            type_graphql_1.ObjectType("SomeName")
        ], FilterableType);
        let SampleResolver = class SampleResolver {
            filterableQuery(filter) {
                return new FilterableType();
            }
        };
        __decorate([
            type_graphql_1.Query(() => FilterableType),
            __param(0, type_graphql_1.Arg("filter", helpers_1.generateFilterType(FilterableType), { nullable: true })),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", FilterableType)
        ], SampleResolver.prototype, "filterableQuery", null);
        SampleResolver = __decorate([
            type_graphql_1.Resolver()
        ], SampleResolver);
        const schema = await type_graphql_1.buildSchema({
            resolvers: [SampleResolver]
        });
        const result = await graphql_1.graphql(schema, graphql_1.getIntrospectionQuery());
        schemaIntrospection = result.data.__schema;
    });
    const assertFilterFields = (type) => {
        const operatorFieldType = type.inputFields.find((field) => field.name === "operator").type;
        expect_1.default(operatorFieldType.name).toEqual("BaseOperator");
        expect_1.default(operatorFieldType.kind).toEqual(graphql_1.TypeKind.ENUM);
        const amountGtType = type.inputFields.find((field) => field.name === "amount_gt").type;
        expect_1.default(amountGtType.name).toEqual("Int");
        expect_1.default(amountGtType.kind).toEqual(graphql_1.TypeKind.SCALAR);
        const amountLtType = type.inputFields.find((field) => field.name === "amount_lt").type;
        expect_1.default(amountLtType.name).toEqual("Int");
        expect_1.default(amountLtType.kind).toEqual(graphql_1.TypeKind.SCALAR);
        const purposeLikeType = type.inputFields.find((field) => field.name === "purpose_like").type;
        expect_1.default(purposeLikeType.name).toEqual("String");
        expect_1.default(purposeLikeType.kind).toEqual(graphql_1.TypeKind.SCALAR);
        const purposeEqType = type.inputFields.find((field) => field.name === "purpose_eq").type;
        expect_1.default(purposeEqType.name).toEqual("String");
        expect_1.default(purposeEqType.kind).toEqual(graphql_1.TypeKind.SCALAR);
    };
    it("should generate a proper condition type", () => {
        const conditionType = schemaIntrospection.types.find(type => type.name === "SomeNameCondition");
        expect_1.default(conditionType.inputFields.length).toEqual(5);
        assertFilterFields(conditionType);
    });
    it("should generate a proper filter type", () => {
        const filterType = schemaIntrospection.types.find(type => type.name === "SomeNameFilter");
        expect_1.default(filterType.inputFields.length).toEqual(6);
        const conditionsFieldType = filterType.inputFields.find((field) => field.name === "conditions").type;
        expect_1.default(conditionsFieldType.kind).toEqual(graphql_1.TypeKind.LIST);
        expect_1.default(conditionsFieldType.ofType.kind).toEqual(graphql_1.TypeKind.NON_NULL);
        const conditionsItemFieldType = (conditionsFieldType.ofType)
            .ofType;
        expect_1.default(conditionsItemFieldType.kind).toEqual(graphql_1.TypeKind.INPUT_OBJECT);
        expect_1.default(conditionsItemFieldType.name).toEqual("SomeNameCondition");
        assertFilterFields(filterType);
    });
});
//# sourceMappingURL=generateFilterType.spec.js.map