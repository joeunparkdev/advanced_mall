import dotenv from 'dotenv';
dotenv.config();

import { configurePassport } from "../src/passport/index.js";
import express from "express";
import http from "http"; 
import https from "https";
import fs from "fs";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";
import productsRouter from "./routers/products.router.js";
import usersRouter from "./routers/users.router.js";
import authRouter from "./routers/auth.router.js";

const app = express();
configurePassport(app);

// CORS 설정
const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3001;
const HTTPS_PORT = process.env.HTTPS_PORT || 3002;

const httpsOptions = {
  key: fs.readFileSync(process.env.HTTPS_KEY),
  cert: fs.readFileSync(process.env.HTTPS_CERT),
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);

httpServer.listen(PORT, () => {
  console.log(`HTTP Server is running on port ${PORT}`);
});

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
});

export { app };
