import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
    required: [true, "An offer must be provided"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: [true, "A user must be provided"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "refused"],
    default: "pending",
  },
  description: { type: String }, // Ajout d'une description
  message: { type: String },     // Ajout d'un message
  createdAt: { type: Date, default: Date.now },
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
