import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: { type: String, require: [true, "a title must be provided"] },
  position: { type: String, require: [true, "a title must be provided"] },
  comapny: { type: String, require: [true, "a title must be provided"] },
  description: { type: String, require: [true, "a title must be provided"] },
  status: {
    type: String,
    enum: ["accepted", "pending", "refused", "withdraw"],
  },
  createdAt: { type: Date, default: Date.now },
  applicationNumber: Number,
});
const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
