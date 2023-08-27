import pino from "pino";
import ENV from "./env";

export default pino({
  enabled: ENV.Logger.ENABLED,
  level: ENV.Logger.LEVEL
});
