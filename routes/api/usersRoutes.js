const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
  getFriends
} = require('../../controllers/usersController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends
router.route('/api/users/:userId/friends').post(addFriend).get(getFriends);

// /api/users/:userId/friends/:friendId
router.route('/api/users/:userId/friends/:friendId').post(deleteFriend);

module.exports = router;
