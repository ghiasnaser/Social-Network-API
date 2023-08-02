const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().select('-__v');
      const userObj = {
        users,
        total_friends : users.friendCount,
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a User and remove thier thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } });

      if (!thoughts) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      }

      res.json({ message: 'User successfully deleted and his thoughts' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update an exisiting user 
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'No such user exists' });
      }
  
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an Friend to a User
  async addFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      console.log(user);
      const friend=await User.findById(req.body._id);
      console.log(friend);
      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      if(!friend){
        return res.status(404).json({message:'there is no user with this ID to add as a friend'});
      }
  
      // Check if the friendId is already in the user's friends array
      if (user.friends.includes(req.body._id)) {
        return res.status(400).json({ message: 'Friend is already in the user\'s friends list' });
      }
  
      // If the friendId is not in the user's friends array, add them using $addToSet
      user.friends.push(req.body._id);
      await user.save();
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  ,
  
  // Remove friend from a user
  async  deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async  getFriends(req, res) {
    try {
      const user = await User.findById(req.params.userId).populate('friends');
  
      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
  
      const friends = user.friends;
      res.json(friends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
