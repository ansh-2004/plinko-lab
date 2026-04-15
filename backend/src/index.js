import express from "express"
import cors from "cors"
import roundRoutes from './routes/roundRoutes.js'
import verifyRoutes from "./routes/verifyRoutes.js";
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
  res.send("Server running")
  
})

app.use('/api/rounds',roundRoutes)
app.use("/api", verifyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})