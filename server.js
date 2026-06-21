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
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//api endPoints
import authRoute from "./src/routes/authRoute.js";
import usersRoute from "./src/routes/usersRoute.js";
import booksRoute from "./src/routes/booksRoute.js";
import borrowRoute from "./src/routes/borrowRoute.js";
import reviewRoute from "./src/routes/reviewRoute.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/books", booksRoute);
app.use("/api/v1/borrows", borrowRoute);
app.use("/api/v1/reviews", reviewRoute);

import { responseClient } from "./src/middlewares/responseClient.js";
//Check server status
app.get("/", (req, res) => {
  const message = "Server is live";
  responseClient({ req, res, message });
});
app.use(errorHandler);
