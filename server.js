import { error } from "console";
import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
const PORT = process.env.PORT || 8000;

//DB Connection
import { dbConnect } from "./src/config/dbConfig.js";
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

//api endPoints
import authRoute from "./src/routes/authRoute.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
app.use("/api/v1/auth", authRoute);

import { responseClient } from "./src/middlewares/responseClient.js";
//Check server status
app.get("/", (req, res) => {
  const message = "Server is live";
  responseClient({ req, res, message });
});
app.use(errorHandler);
