import express from "express";

const app = express(); // created an express app

app.use(express.json())

// import routes here
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"

// router declarations
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// example route: http://localhost:4000/api/v1/users/registered



export default app;