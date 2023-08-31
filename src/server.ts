import "./config/module-alias";
import express, { Application } from "express";
import { prisma } from "@src/providers/database/prisma-client";
import ENV from "./env";
import logger from "./logger";
import cors from "cors";
import { routes } from "./routes";

export class SetupServer {
  private express: express.Application;
  private port = ENV.Application.PORT;

  constructor() {
    this.express = express();
  }

  public async init(): Promise<void> {
    this.expressSetup();
    await this.databaseSetup();
  }

  private expressSetup(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(routes);
  }

  public getApp(): Application {
    return this.express;
  }

  public async databaseSetup(): Promise<void> {
    await prisma.$connect();
  }

  public async close(): Promise<void> {
    await prisma.$disconnect();
  }

  public start(): void {
    this.express.listen(this.port, () => {
      logger.info(`Server listening on port ${this.port}`);
    });
  }
}
