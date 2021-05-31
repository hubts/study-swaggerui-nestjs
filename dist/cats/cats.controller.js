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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cats_service_1 = require("./cats.service");
const create_cat_dto_1 = require("./dto/create-cat.dto");
const create_cat_error_dto_1 = require("./dto/create-cat.error.dto");
const cat_entity_1 = require("./entities/cat.entity");
let CatsController = class CatsController {
    constructor(catsService) {
        this.catsService = catsService;
    }
    async create(createCatDto) {
        return this.catsService.create(createCatDto);
    }
    findOne(id) {
        return this.catsService.findOne(+id);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: '새로운 고양이를 들여오자!' }),
    swagger_1.ApiResponse({ status: 201, description: '새롭게 Cat 입양!', type: cat_entity_1.Cat }),
    swagger_1.ApiResponse({ status: 400, description: 'Error: Bad Request', type: create_cat_error_dto_1.CreateCatErrorDto }),
    openapi.ApiResponse({ status: 201, type: require("./entities/cat.entity").Cat }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cat_dto_1.CreateCatDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "create", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ summary: '고양이를 찾아보자!' }),
    swagger_1.ApiResponse({
        status: 200,
        description: '원하는 고양이를 찾았다!',
        type: cat_entity_1.Cat,
    }),
    swagger_1.ApiParam({
        name: 'id',
        description: '원하는 고양이를 찾을 번호 (입양 후 조회할 것)',
        type: "string",
        example: 1
    }),
    openapi.ApiResponse({ status: 200, type: require("./entities/cat.entity").Cat }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", cat_entity_1.Cat)
], CatsController.prototype, "findOne", null);
CatsController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('고양이 API'),
    common_1.Controller('cats'),
    __metadata("design:paramtypes", [cats_service_1.CatsService])
], CatsController);
exports.CatsController = CatsController;
//# sourceMappingURL=cats.controller.js.map