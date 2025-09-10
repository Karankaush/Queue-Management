const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // vendor user
      required: true,
    },
    customers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // customer user
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    service: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Queue = mongoose.model("Queue", queueSchema);
module.exports =  Queue;
