import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import { appDataSource } from "./appDataSource";
const app = express();

const PORT = 9191;
const API_ROUTE = require("./api.router");

app.use(cors());

// Inbuilt Middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("uploads"));
app.use("/files", express.static(path.join(process.cwd(), "/src/uploads")));

appDataSource
  .initialize()
  .then(() => console.log("Database Connection Successfully"))
  .catch((err) => console.log("Error while connecting to database > ", err));

app.use("/", API_ROUTE);

// 404 Error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next({
    message: "Page not found",
    status: 404,
  });
});

// Application level middleware
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500);
  res.json({
    message: err.message || err,
    status: err.status || 500,
  });
});

app.listen(PORT, () => {
  console.log("Server is listening at port ", PORT);
});
