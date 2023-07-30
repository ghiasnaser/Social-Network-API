const mongoose = require('mongoose');
const reactionSchema = require('./Reaction'); // Import the reactionSchema

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp), // Implement the dateFormat function
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Using the imported Reaction subdocument schema as an array of nested documents
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual to get the length of the thought's reactions array field
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
