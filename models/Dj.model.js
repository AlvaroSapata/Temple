const { Schema, model } = require("mongoose");

const djSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Dj = model("Dj", djSchema);

module.exports = Dj;
