/** @format */
import { io } from "../main";
//import { authorizeSocket } from "../middlewares";

export const intSocket$ = () => {
  io.on("connection", (socket: any) => {
    socket.authorized = false;
    socket.emit("connected", { connected: true, authorized: false });
    setTimeout(() => {
      if (!socket.authorized) socket.disconnect(true);
    }, 1000);

    socket.on("authorize", async ({ token }: { token: string }) => {
      // const user = await authorizeSocket(token);
      // socket.authorized = true;
      // socket.join(`me:${user.id}`);
      // io.to(`me:${user.id}`).emit("me", user);
    });
  });
};
