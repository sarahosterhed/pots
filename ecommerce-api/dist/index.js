"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    // origin: "http://localhost:5173",
    origin: "*",
    credentials: true, // ✅ Allows cookies
}));
// Routes
const products_1 = __importDefault(require("./routes/products"));
const customers_1 = __importDefault(require("./routes/customers"));
const orders_1 = __importDefault(require("./routes/orders"));
const orderItems_1 = __importDefault(require("./routes/orderItems"));
const stripe_1 = __importDefault(require("./routes/stripe"));
// import authRouter from "./routes/auth";
app.use('/products', products_1.default);
app.use('/customers', customers_1.default);
app.use('/orders', orders_1.default);
app.use('/order-items', orderItems_1.default);
app.use('/stripe', stripe_1.default);
// app.use('/auth', authRouter)
// Attempt to connect to the database
(0, db_1.connectDB)();
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}`);
});
exports.default = (req, res) => {
    return app(req, res);
};
