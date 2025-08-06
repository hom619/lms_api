import express from "express";
const router = express.Router();

//User signup

router.post("/register", (req, res, next) => {
  try {
    res.json({
      status: "sucess",
      message: "TODO",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
