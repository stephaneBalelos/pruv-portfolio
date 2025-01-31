import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const base = ".uploads";

  const file = getRouterParam(event, "file");

  if (!file) {
    return createError({
        statusCode: 404,
        message: "File not found"
    })
  }

  const filePath = path.join(base, file);

  return sendStream(event, fs.createReadStream(filePath));
});