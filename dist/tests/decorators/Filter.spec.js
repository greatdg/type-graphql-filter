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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const expect_1 = __importDefault(require("expect"));
const type_graphql_1 = require("type-graphql");
const decorators_1 = require("../../lib/decorators");
const metadata_1 = require("../../lib/metadata");
describe("@Filter", () => {
    let FilterableType = class FilterableType {
    };
    __decorate([
        type_graphql_1.Field(type => type_graphql_1.Int),
        decorators_1.Filter(["lt", "gt"], type => type_graphql_1.Int),
        __metadata("design:type", Number)
    ], FilterableType.prototype, "filteredNumberField", void 0);
    __decorate([
        type_graphql_1.Field(type => String),
        decorators_1.Filter(["eq", "like"]),
        __metadata("design:type", String)
    ], FilterableType.prototype, "filteredStringField", void 0);
    FilterableType = __decorate([
        type_graphql_1.ObjectType("FilterName")
    ], FilterableType);
    it("should store proper metadata for decorated fields", () => {
        const metadataStorage = metadata_1.getMetadataStorage();
        const numberFieldMetadata = metadataStorage.filters.find(filter => filter.target === FilterableType &&
            filter.field === "filteredNumberField") || {};
        expect_1.default(numberFieldMetadata).toMatchObject({
            target: FilterableType,
            field: "filteredNumberField",
            operators: ["lt", "gt"]
        });
        expect_1.default(typeof numberFieldMetadata.getReturnType).toEqual("function");
        expect_1.default(numberFieldMetadata.getReturnType()).toEqual(type_graphql_1.Int);
        const stringFieldMetadata = metadataStorage.filters.find(filter => filter.target === FilterableType &&
            filter.field === "filteredStringField");
        expect_1.default(stringFieldMetadata).toEqual({
            target: FilterableType,
            field: "filteredStringField",
            operators: ["eq", "like"],
            getReturnType: undefined
        });
    });
});
//# sourceMappingURL=Filter.spec.js.map