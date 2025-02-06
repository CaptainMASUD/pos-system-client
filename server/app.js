import express from "express"

const app = express()

app.use(express.json())

//api routes
import UserRoutes from "./routes/user.routes.js"
import AuthRoutes from "./routes/auth.routes.js"
app.use('/api/users', UserRoutes)
app.use('/api/auth', AuthRoutes)

//handle error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    res.status(statusCode).json({
        success : "false",
        statusCode,
        message
    })
})



export {app}