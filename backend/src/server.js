import app from "./app.js"
import "dotenv/config"
import connectDB from "./database/db.js";

const startServer = async()=>{
    const PORT = process.env.PORT || 3000;
    try {
        await connectDB()
        app.listen(PORT, ()=>{
            console.log("Server created at port: " + PORT);
        })
    } catch (error) {
        console.log("Server side error:" + error);
    }
}

startServer()