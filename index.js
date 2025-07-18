import express from "express";
import cors from "cors";
import "dotenv/config";
import { requireBearerToken } from "./src/middlewares/auth.middleware.js";
import cookieSession from "cookie-session";

// Import routes
import productsRoutes from "./src/routes/products.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Cookie session middleware
app.use(cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//CORS middleware
const corsOptions = {
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());

//Routes
//Home route
app.get("/", (req, res) => {
    res.send("Bienvenido a mi API.");
});
//Products routes - require authentication
app.use("/api/products", requireBearerToken, productsRoutes);
//Auth routes - no authentication required
app.use("/auth", authRoutes);

// 404 middleware - must be after all routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

//Error middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

//Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 


export default app;