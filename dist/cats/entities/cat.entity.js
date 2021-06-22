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
exports.Cat = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class Cat {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, age: { required: true, type: () => Number }, breed: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty({
        example: `네오`,
        description: `우리 고양이의 귀여운 이름`
    }),
    __metadata("design:type", String)
], Cat.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNumber(),
    swagger_1.ApiProperty({
        example: 3,
        description: `우리 고양이의 귀여운 나이`
    }),
    __metadata("design:type", Number)
], Cat.prototype, "age", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty({
        example: `페르시안`,
        description: `breed가 뭐종? 바로바로 고양이종 ㅋㅋ`,
    }),
    __metadata("design:type", String)
], Cat.prototype, "breed", void 0);
exports.Cat = Cat;
//# sourceMappingURL=cat.entity.js.map