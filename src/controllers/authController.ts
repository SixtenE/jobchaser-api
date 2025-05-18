import type { Request, Response } from "express";
import { z } from "zod";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../utils/prisma";

export async function signIn(req: Request, res: Response) {
  const parsedBody = z
    .object({
      email: z.string().email(),
      password: z.string().min(1),
    })
    .safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: parsedBody.data.email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const passwordMatch = await compare(parsedBody.data.password, user.password);

  if (!passwordMatch) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
    }
  );

  res.status(200).json({
    token,
  });
}

export async function signUp(req: Request, res: Response) {
  const parsedBody = z
    .object({
      email: z.string().email(),
      password: z.string().min(1),
    })
    .safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsedBody.data.email,
    },
  });

  if (existingUser) {
    res.status(409).json({ message: "Conflict" });
    return;
  }

  const hashedPassword = await hash(parsedBody.data.password, 10);

  const user = await prisma.user.create({
    data: {
      email: parsedBody.data.email,
      password: hashedPassword,
    },
  });

  res.status(201).json(user);
}
