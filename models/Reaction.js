const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId:{
    type: Number,
    default: 0, // Initial value for tracking
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp), // Implement the dateFormat function
  },
});



module.exports = reactionSchema;
