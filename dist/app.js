"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./app/route"));
const cors_1 = __importDefault(require("cors"));
const gobalErrorHandler_1 = __importDefault(require("./app/middleware/gobalErrorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/", route_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(gobalErrorHandler_1.default);
//Not Found
// app.use(NotFound);
exports.default = app;
