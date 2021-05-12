/** @format */
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "http";
import { Socket } from "socket.io";
import { address } from "ip";
import env, { publicPath } from "./env";
import { chiripaConnect } from "./connections/mongo";
import { intSocket$ } from "./connections/socket";

import usersRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import appRoutes from "./routes/app.route";
import { urlMiddleware } from "./middlewares/auth.middleware";

export const app: Application = express();
export const server = createServer(app);
export const io: Socket = require("socket.io")(server);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.use("/api/user", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/app", appRoutes);

app.all("/api/*", urlMiddleware);

server.listen(env.port, async () => {
  await chiripaConnect();
  intSocket$();
  console.log(
    `start: http://${address()}:${env.port} http://localhost:${env.port} ✌`
  );
});
