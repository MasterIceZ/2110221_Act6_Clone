import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { PrismaClient } from "@prisma/client";

import { handleGetPlayerLook } from "./handlers/getPlayerLook";
import { handleGetPlayerXY } from "./handlers/getPlayerXY";
import { handleUpdate } from "./handlers/update";

const db = new PrismaClient();

const app = new Elysia()
  .use(swagger())
  .get("/", () => "Hello, World!")
  .get(
    "/roomapi/getplayerlook",
    ({ headers, query }) =>
      handleGetPlayerLook(headers["x-secret"], query.secret, query.player, db),
    {
      headers: t.Object({
        "x-secret": t.String(),
      }),
      query: t.Object({
        secret: t.String(),
        player: t.String(),
      }),
    }
  )
  .get(
    "/roomapi/getplayerxy",
    ({ headers, query }) =>
      handleGetPlayerXY(headers["x-secret"], query.secret, query.player, db),
    {
      headers: t.Object({
        "x-secret": t.String(),
      }),
      query: t.Object({
        secret: t.String(),
        player: t.String(),
      }),
    }
  )
  .post(
    "/roomapi/update",
    ({ headers, body }) =>
      handleUpdate(
        headers["content-type"],
        headers["x-secret"],
        body.pos_x,
        body.pos_y,
        body.target_x,
        body.target_y,
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
