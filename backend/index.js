const express = require("express");
const cors = require("cors")


const mainRouter = require("./routes/index")

app = express()
app.use(cors())
app.use(express.json())


app.use("/api/v1", mainRouter)

app.listen(3000,()=>console.log(`Example app listening on port`))