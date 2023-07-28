const router = require('express').Router();
const thoughtRoutes = require('./thoughtsRoutes');
const userRoutes = require('./usersRoutes');

router.use('/thought', courseRoutes);
router.use('/user', studentRoutes);

module.exports = router;
