"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
const metadata_1 = require("../metadata");
/**
 * This decorator will store filters information for the field in a metadata storage.
 * We will use this metadata later on to generate an InputType for the filters argument
 *
 * @param operators
 * @param returnTypeFunction
 */
function Filter(operators, returnTypeFunction, options) {
    return (prototype, field) => {
        const metadataStorage = metadata_1.getMetadataStorage();
        metadataStorage.filters.push({
            field,
            getReturnType: returnTypeFunction,
            operators: typeof operators === "string" ? [operators] : operators,
            target: prototype.constructor,
            options,
        });
    };
}
exports.Filter = Filter;
//# sourceMappingURL=Filter.js.map