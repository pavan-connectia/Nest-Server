"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const errorHandler_1 = require("./middleware/errorHandler");
const Amenity_1 = __importDefault(require("./routes/Amenity"));
const Service_1 = __importDefault(require("./routes/Service"));
const Property_1 = __importDefault(require("./routes/Property"));
const User_1 = __importDefault(require("./routes/User"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://nest-admin-dashboard.vercel.app"
    ]
}));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use('/api/amenities', Amenity_1.default);
app.use('/api/services', Service_1.default);
app.use('/api/properties', Property_1.default);
app.use('/api/users', User_1.default);
app.use((req, res) => {
    return res.status(200).json({
        success: true,
        message: "Api is running",
    });
});
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
app.use(errorHandler_1.errorHandler);
const startServer = async () => {
    try {
        await (0, database_1.connectToDatabase)();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log('Error starting server:', error);
    }
};
startServer();
