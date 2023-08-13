const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const cors = require('cors');
require("dotenv").config();
require("./db/index");

// MIDDLEWARE
app.use(express.json());
app.use(errorHandler);

app.use(cors({
    origin:"*"
}))

// ROUTES
app.use("/api",require("./routes/User"));

// APP 
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`You are live on ${PORT}`);
})
