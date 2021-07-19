"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEqualTo = void 0;
const class_validator_1 = require("class-validator");
function IsEqualTo(property, validationOptions) {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            name: 'isEqualTo',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return value === relatedValue;
                },
                defaultMessage(args) {
                    const [relatedPropertyName] = args.constraints;
                    return `$property must match ${relatedPropertyName} exactly`;
                },
            },
        });
    };
}
exports.IsEqualTo = IsEqualTo;
//# sourceMappingURL=isequalto.validator.js.map