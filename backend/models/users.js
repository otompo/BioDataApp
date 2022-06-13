const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    contactNum: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    resetCode: "",
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", usersSchema);
