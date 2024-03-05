import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { PrismaClient } from "@prisma/client";
import { cors } from "@elysiajs/cors";

import { handleGetPlayerLook } from "./handlers/getPlayerLook";
import { handleGetPlayerXY } from "./handlers/getPlayerXY";
import { handleUpdate } from "./handlers/update";

const db = new PrismaClient();

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .get("/", () => "Hello, World!")
  .get(
    "/roomapi/getplayerlook",
    ({ headers }) => handleGetPlayerLook(headers["x-secret"], db),
    {
      headers: t.Object({
        "x-secret": t.String(),
      }),
    }
  )
  .get(
    "/roomapi/getplayerxy",
    ({ headers, query }) => handleGetPlayerXY(headers["x-secret"], db),
    {
      headers: t.Object({
        "x-secret": t.String(),
      }),
    }
  )
  .post(
    "/roomapi/update",
    ({ headers, body }) =>
      handleUpdate(
        headers["content-type"],
        headers["x-secret"],
        String(body.pos_x),
        String(body.pos_y),
        String(body.target_x),
        String(body.target_y),
        db
      ),
    {
      headers: t.Object({
        "content-type": t.String(),
        "x-secret": t.String(),
      }),
      body: t.Object({
        pos_x: t.String(),
        pos_y: t.String(),
        target_x: t.String(),
        target_y: t.String(),
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}/roomapi`
);
