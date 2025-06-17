import express from "express";
import cors from "cors";
import "dotenv/config";
import jobRouter from "./routes/jobRoutes";
import authRouter from "./routes/authRoutes";
import helmet from "helmet";

const PORT = 8080;
const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${JSON.stringify(server.address())}`);
});
