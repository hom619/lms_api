import { error } from "console";
import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
const PORT = process.env.PORT || 8000;

//DB Connection
import { dbConnect } from "./config/dbConfig.js";
dbConnect()
  .then(() => {
    app.listen(PORT, (err) => {
      err
        ? console.log(error)
        : console.log("Server running at http://localhost:8000");
    });
  })
  .catch((error) => console.log(error));
//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//Check server status
app.get("/", (req, res) => {
  res.json({
    message: "Server is live",
  });
});
