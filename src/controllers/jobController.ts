import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { z } from "zod";
import { RequestWithUser } from "../utils/authMiddleware";

export async function getJobs(req: Request, res: Response) {
  try {
    const jobs = await prisma.job.findMany({
      select: {
        id: true,
        company: true,
        logo: true,
        position: true,
        role: true,
        level: true,
        postedAt: true,
        contract: true,
        location: true,
        languages: true,
        tools: true,
      },
    });

    res.status(200).json(jobs);
    return;
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
}

export async function getJobById(req: Request, res: Response) {
  const parsedParams = z
    .object({
      id: z.string(),
    })
    .safeParse(req.params);

  if (!parsedParams.success) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  try {
    const job = await prisma.job.findUnique({
      where: {
        id: parsedParams.data.id,
      },
    });

    if (!job) {
      res.status(404).json({ message: "Not Found" });
      return;
    }

    res.status(200).json(job);
    return;
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
}

export async function bookmarkJob(req: RequestWithUser, res: Response) {
  const parsedUser = z
    .object({
      id: z.string(),
    })
    .safeParse(req.user);

  if (!parsedUser.success) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const parsedParams = z
    .object({
      id: z.string(),
    })
    .safeParse(req.params);

  if (!parsedParams.success) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  try {
    const job = await prisma.job.findUnique({
      where: {
        id: parsedParams.data.id,
      },
    });

    if (!job) {
      res.status(404).json({ message: "Not Found" });
      return;
    }

    const bookmark = await prisma.bookmark.upsert({
      where: {
        userId_jobId: {
          userId: parsedUser.data.id,
          jobId: job.id,
        },
      },
      create: {
        userId: parsedUser.data.id,
        jobId: job.id,
      },
      update: {},
    });

    res.status(201).json(bookmark);
    return;
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
}

export async function removeBookmark(req: RequestWithUser, res: Response) {
  const parsedUser = z
    .object({
      id: z.string(),
    })
    .safeParse(req.user);

  if (!parsedUser.success) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const parsedParams = z
    .object({
      id: z.string(),
    })
    .safeParse(req.params);

  if (!parsedParams.success) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  try {
    const job = await prisma.job.findUnique({
      where: {
        id: parsedParams.data.id,
      },
    });

    if (!job) {
      res.status(404).json({ message: "Not Found" });
      return;
    }

    await prisma.bookmark.deleteMany({
      where: {
        userId: parsedUser.data.id,
        jobId: job.id,
      },
    });

    res.status(204).json();
    return;
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
}
