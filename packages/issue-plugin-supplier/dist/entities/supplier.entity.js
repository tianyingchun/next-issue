"use strict";var __decorate=this&&this.__decorate||function(e,t,r,p){var o,i=arguments.length,a=i<3?t:null===p?p=Object.getOwnPropertyDescriptor(t,r):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,p);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(a=(i<3?o(a):i>3?o(t,r,a):o(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Supplier=void 0;const core_1=require("@vendure/core"),typeorm_1=require("typeorm");let Supplier=class Supplier extends core_1.VendureEntity{constructor(e){super(e)}};__decorate([(0,typeorm_1.Column)(),__metadata("design:type",String)],Supplier.prototype,"supplierName",void 0),__decorate([(0,typeorm_1.Column)({unique:!0}),__metadata("design:type",String)],Supplier.prototype,"supplierNo",void 0),__decorate([(0,typeorm_1.Column)({nullable:!0}),__metadata("design:type",String)],Supplier.prototype,"supplierType",void 0),__decorate([(0,typeorm_1.Column)({type:"tinytext",nullable:!0}),__metadata("design:type",String)],Supplier.prototype,"comment",void 0),Supplier=__decorate([(0,typeorm_1.Entity)("supplier"),__metadata("design:paramtypes",[Object])],Supplier),exports.Supplier=Supplier;