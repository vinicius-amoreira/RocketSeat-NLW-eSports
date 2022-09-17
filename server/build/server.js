"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/ads', (request, response) => {
    return response.json([
        { id: 1, nome: 'Anúncio 1' },
        { id: 2, nome: 'Anúncio 2' },
        { id: 3, nome: 'Anúncio 3' },
        { id: 4, nome: 'Anúncio 4' },
    ]);
});
app.listen(3333);
