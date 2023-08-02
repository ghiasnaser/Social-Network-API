const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
    // Get all Tthoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        const thoughtObj = {
          thoughts,
        };
  
        res.json(thoughtObj);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
          const thoughtId = req.params.thoughtId;
      
          // findOne() to find the thought based on its _id
          const thought = await Thought.findOne({ _id: thoughtId }).select('-__v');
      
          if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
      
          res.json(thought);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      },

    // create new thought
    async createThought(req, res) {
        try {
          // Step 1: Create the thought
          const thought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
          });
      
          // Step 2: Find the user and associate the thought with them
          const user = await User.findOneAndUpdate(
            { username: req.body.username }, 
            { $push: { thoughts: thought._id } },
            { new: true }
          );
      
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          }
      
          res.json(thought);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      },


      async updateThought(req, res) {
        try {
          const thoughtId = req.params.thoughtId;
      
          // Define the update object with the new values you want to set
          const update = {
            thoughtText: req.body.thoughtText,
            // Add other fields that you want to update
          };
      
          // Use findOneAndUpdate() to find the thought based on its _id and update it
          const updatedThought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            update,
            { new: true }
          );
      
          if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
      
          res.json(updatedThought);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      },


      async deleteThought(req, res) {
        try {
          const thoughtId = req.params.thoughtId;
      
          // Step 1: Delete the thought using findOneAndDelete()
          const deletedThought = await Thought.findOneAndDelete({ _id: thoughtId });
      
          if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
      
          // Step 2: Remove the thought's ObjectId from the user's thoughts array using findOneAndUpdate()
          const updatedUser = await User.findOneAndUpdate(
            { thoughts: thoughtId }, // Find the user whose thoughts array contains the deleted thought's ObjectId
            { $pull: { thoughts: thoughtId } }, // Remove the thought's ObjectId from the user's thoughts array
            { new: true }
          );
      
          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.json({ deletedThought, updatedUser });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      },

      // create reaction on a thought 
      async createReaction(req, res) {
        try {
          const thoughtId = req.params.thoughtId;
          console.log('----------------------------------------------');
          console.log(thoughtId);
          console.log('----------------------------------------------');
      
          // Step 1: Find the thought by its _id
          let thought = await Thought.findOne({ _id: thoughtId });
          console.log('----------------------------------------------');
          console.log(thought);
          console.log('----------------------------------------------');
          if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
      
          // Create a new reaction object based on the Reaction schema
          const newReaction = {
            reactionId: thought.reactions.length,
            reactionBody: req.body.reactionBody,
            username: req.body.username,
          };
          console.log('----------------------------------------------');
          console.log(newReaction);
          console.log('----------------------------------------------');
      
          // Step 2: Add the new reaction object to the thought's reactions array
          thought.reactions.push(newReaction);
          console.log(thought);
          // Step 3: Save the updated thought with the new reaction
          const updatedThought = await thought.save();
          console.log(updatedThought);
          console.log('----------------------------------------------');
          console.log(updatedThought);
          console.log('----------------------------------------------');
          res.json(updatedThought);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      },
      
      // delete a reaction 
      async deleteReaction(req, res) {
        try {
          const thoughtId = req.params.thoughtId;
          const reactionId = req.params.reactionId;
          // Step 1: Find the thought by its _id
          console.log(reactionId);
          const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { reactionId: reactionId } }},
            {new: true }
            );
          for (var i=0;i<thought.reactions.length;i++){
            thought.reactions[i].reactionId=i;
          }
            console.log(thought);
          if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
      
          // Step 2: Find the index of the reaction in the thought's reactions array
          // const reactionIndex = thought.reactions.findIndex(
          //   (reaction) => reaction._id.toString() === reactionId
          // );


          //   console.log(thought.reactions[0]._id.toString());
          
          // var reactionIndex=-1;
          // for (var i=0;i<thought.reactions.length;i++){
          //   console.log(thoughtId);
          //   console.log(reactionId);
          //   console.log(thought.reactions[i]._id.toString());
          //   if (thought.reactions[i]._id.toString() === reactionId){
          //     reactionIndex=i;
          //   }
          //   else{
          //     reactionIndex=-1;
          //   }
          // }
          // Step 3: If the reaction is not found, return a 404 status code
          // if (reactionIndex === -1) {
          //   return res.status(404).json({ message: 'Reaction not found in the thought' });
          // }
      
          // Step 4: Remove the reaction from the reactions array
         // thought.reactions.splice(reactionIndex, 1);
      
          // Step 5: Save the updated thought after removing the reaction
          //const thought = await thought.save();
      
          res.json(thought);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      },

      // get all the reactions assosiated whith a thought
      async getReactions(req, res) {
        try {
          const thoughtId = req.params.thoughtId;
      
          // Step 1: Find the thought by its _id and select only the reactions field
          const thought = await Thought.findOne({ _id: thoughtId }).select('reactions');
      
          if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
      
          res.json(thought.reactions);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      },
}