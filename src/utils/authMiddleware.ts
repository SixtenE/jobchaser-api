import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { type JwtPayload, verify } from "jsonwebtoken";

export interface RequestWithUser extends Request {
  user?: JwtPayload;
}

export async function authMiddleware(
  req: RequestWithUser,
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
    req.user = verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}
