const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  image: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,

  },

  location: {
    type: Schema.Types.ObjectId,
    ref: "Location"
  },

  gallery:{
    type: [String],
    //default: []
    
  },

  afterMovie: {
    type: String,
    //default: "Proximamente..."
    
  },

  djs: {
    type: [Schema.Types.ObjectId],
    ref: "Dj"
  },

  joinPeople: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: []
  },

  createdBy: {
    type: Schema.Types.ObjectId,
        ref: "User"
  }



});


const Event = model("Event", eventSchema);

module.exports = Event;