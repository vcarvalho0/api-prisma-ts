import { prisma } from "@src/providers/database/prisma-client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { comparePassword } from "@src/providers/encrypt/bcrypt/compare-password";
import { AuthProvider } from "@src/providers/encrypt/jwt/jwt-token";
import logger from "@src/logger";

export class UserController {
  async create(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const userExist = await prisma.user.findUnique({
      where: { email }
    });

    if (userExist) {
      return res
        .status(200)
        .send({ message: `Email ${email} is already registered!` });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hash
      },
      select: { id: true, email: true, username: true, createdAt: true }
    });

    const token = AuthProvider.generateToken(user.id);

    logger.info("User created");
    return res.status(201).json({ ...user, ...{ token } });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(422).send({ message: "Invalid email or password" });
    }

    const token = AuthProvider.generateToken(user.id);

    logger.info("Authenticated");
    return res.status(200).json({ ...user, token });
  }

  async me(req: Request, res: Response) {
    const id = req.context?.userId;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res
        .status(404)
        .send({ message: `User with ${id} doesn't exist!` });
    }

    return res.status(200).json({ ...user });
  }
}
