import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import { prisma } from "./utils/prisma";

const PORT = 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  res.status(200).json(users);
});

app.post("/", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      email: `${Math.random().toString(36).substring(7)}@example.com`,
      name: `User ${Math.random().toString(36).substring(7)}`,
      password: `${Math.random().toString(36).substring(7)}`,
    },
  });
  res.status(201).json(user);
});

// Catch-all route
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${JSON.stringify(server.address())}`);
});
