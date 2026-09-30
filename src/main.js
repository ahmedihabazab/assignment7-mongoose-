import express from "express";
import { PORT } from "./config/config.js";
import { DBConnection } from "./DB/connection.db.js";
import { authController } from "./modules/auth/auth.controller.js";
import { userController } from "./modules/user/user.controller.js";
import { noteController } from "./modules/note/note.controller.js";

async function bootstrap() {
  const server = express();

  server.use(express.json());
  await DBConnection()

  server.use("/auth", authController);
  server.use("/users", userController);
  server.use("/notes", noteController)


  server.listen(PORT, () => {
    console.log(`on PORT ${PORT}`);
  });
}

bootstrap();
