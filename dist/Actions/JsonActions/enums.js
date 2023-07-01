"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EJsonRoute = void 0;
var EJsonRoute;
(function (EJsonRoute) {
    EJsonRoute["GET"] = "/:json";
    EJsonRoute["GET_BY_ID"] = "/:json/:id";
    EJsonRoute["CREATE"] = "/:json/create";
    EJsonRoute["UPDATE"] = "/:json/:id";
    EJsonRoute["DELETE"] = "/:json/:id";
})(EJsonRoute || (exports.EJsonRoute = EJsonRoute = {}));
