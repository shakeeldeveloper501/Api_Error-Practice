import express from "express"
import userRouter from "./routes/user.route.js"
import { errorHandler } from "./controllers/user.controller.js"

const app = express()

app.use(express.json())

app.use('/api/user', userRouter)

app.use(errorHandler)

export default app;