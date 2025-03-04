import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import { createServer } from "http";
import cron from "node-cron";

import { connectDB } from "./libs/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";
import { initializeSocket } from "./libs/socket.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);

initializeSocket(httpServer);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
      filesize: 10 * 1024 * 1024,
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

const tempDir = path.join(process.cwd(), "temp");
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.rmdirSync(tempDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlinkSync(path.join(tempDir, file), (err) => {});
      }
    });
  }
}); // every hour

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, ".../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, ".../frontend","dist", "index.html"));
  });
}

app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    });
});

httpServer.listen(5000, () => {
  console.log("Server is runnig on port " + PORT);
  connectDB();
});
//socket.io left
