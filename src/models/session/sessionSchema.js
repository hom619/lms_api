import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    association: {
      type: String,
    },
    expire: {
      type: Date,
      default: new Date(Date.now() + 3600000), //1 hour
      expires: 0, //Keeping 0 expiry means that it will delete once it reaches the default value i.e 1hr
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("session", sessionSchema);
