"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EJsonEntity = exports.EStatusCode = void 0;
var EStatusCode;
(function (EStatusCode) {
    EStatusCode["OK"] = "OK";
    EStatusCode["NOT_FOUND_JSON"] = "NOT_FOUND_JSON";
})(EStatusCode || (exports.EStatusCode = EStatusCode = {}));
var EJsonEntity;
(function (EJsonEntity) {
    EJsonEntity["POSTS"] = "posts";
    EJsonEntity["TODOS"] = "todos";
})(EJsonEntity || (exports.EJsonEntity = EJsonEntity = {}));
