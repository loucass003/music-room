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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterForm = void 0;
const class_validator_1 = require("class-validator");
const isequalto_validator_1 = require("../validators/isequalto.validator");
class RegisterForm {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.MaxLength(50),
    __metadata("design:type", String)
], RegisterForm.prototype, "email", void 0);
__decorate([
    class_validator_1.MinLength(4),
    class_validator_1.MaxLength(16),
    class_validator_1.Matches(/^[a-zA-Z0-9_-]+$/, {
        message: 'name can only contain letters, numbers, hyphens and underscores',
    }),
    __metadata("design:type", String)
], RegisterForm.prototype, "name", void 0);
__decorate([
    class_validator_1.MinLength(8),
    __metadata("design:type", String)
], RegisterForm.prototype, "password", void 0);
__decorate([
    isequalto_validator_1.IsEqualTo('password'),
    __metadata("design:type", String)
], RegisterForm.prototype, "confirmPassword", void 0);
exports.RegisterForm = RegisterForm;
//# sourceMappingURL=register.form.js.map