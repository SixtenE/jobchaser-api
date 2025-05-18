import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { verify } from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const parsedHeaders = z
    .object({
      authorization: z.string(),
    })
    .safeParse(req.headers);

  if (!parsedHeaders.success) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = parsedHeaders.data.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    verify(token, process.env.JWT_SECRET as string);

    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}
