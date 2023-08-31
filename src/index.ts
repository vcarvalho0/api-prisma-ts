import "dotenv/config";
import logger from "./logger";
import { SetupServer } from "./server";

enum Status {
  Failure = 1,
  Success = 0
}

process.on("unhandledRejection", (reason, promise) => {
  logger.error(
    `Application exiting due to an unhandled promise: ${promise} and reason ${reason}`
  );
  throw reason;
});

process.on("uncaughtException", (error) => {
  logger.error(`Application exiting due to an uncaught exception ${error}`);
  process.exit(Status.Failure);
});

const startServer = async (): Promise<void> => {
  try {
    const server = new SetupServer();
    await server.init();
    server.start();

    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

    for (const signals of exitSignals) {
      process.on(signals, async () => {
        try {
          await server.close();
          logger.info(`Application exited with success!`);
          process.exit(Status.Success);
        } catch (error) {
          logger.error(`Application exited with failure! ${error}`);
          process.exit(Status.Failure);
        }
      });
    }
  } catch (error) {
    logger.error(`Application exited with failure! \n${error}`);
    process.exit(Status.Failure);
  }
};

startServer();
