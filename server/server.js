import express from "express";
import cors from "cors";
import { readdirSync } from "fs";

const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// create express app
const app = express();



// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route
readdirSync("./routes").map((r) => app.use('/api/',require(`./routes/${r}`)));




//database connection
mongoose
.connect(process.env.MONGO_URI,{})
.then(()=> console.log("DB connected"))
.catch((e)=>console.log("DB error =>", e))

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
