"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseOperator = void 0;
const type_graphql_1 = require("type-graphql");
var BaseOperator;
(function (BaseOperator) {
    BaseOperator["OR"] = "or";
    BaseOperator["AND"] = "and";
})(BaseOperator = exports.BaseOperator || (exports.BaseOperator = {}));
type_graphql_1.registerEnumType(BaseOperator, { name: "BaseOperator" });
//# sourceMappingURL=baseOperator.js.map