const mongoose = require('mongoose')

const queueSchema = new mongoose.Schema(
  {
    queueName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
      default: 50, // default limit
    },
    currentQueue: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Queue =  mongoose.model("Queue", queueSchema);
module.exports = Queue;
