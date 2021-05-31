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
exports.CreateCatErrorDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCatErrorDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, message: { required: true, type: () => [String] }, error: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 400
    }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateCatErrorDto.prototype, "statusCode", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [
            "name must be a string",
            "age must be an integer number",
            "breed must be a string"
        ]
    }),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], CreateCatErrorDto.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: "Bad Request"
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateCatErrorDto.prototype, "error", void 0);
exports.CreateCatErrorDto = CreateCatErrorDto;
//# sourceMappingURL=create-cat.error.dto.js.map