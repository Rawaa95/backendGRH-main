import express from "express";
import morgan from "morgan";
import userRouter from "./routers/userRouter.js";
import offerRouter from "./routers/offerRouter.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/offer", offerRouter);
export default app;
