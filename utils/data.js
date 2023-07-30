// Array of user names
const userNames = [
    'John Doe',
    'Jane Smith',
    'Michael Johnson',
    'Emily Brown',
    'William Davis',
    'Olivia Wilson',
    'James Lee',
    'Sophia Martin',
    'Robert Anderson',
    'Ava Martinez',
    'David Hernandez',
    'Mia Gonzalez',
    'Daniel Robinson',
    'Isabella Clark',
    'Matthew Lewis',
  ];
  
  // Array of thoughts
  const thoughts = [
    {
      thoughtText: 'This is my first thought!',
      username: 'John Doe',
    },
    {
      thoughtText: 'Having a great day!',
      username: 'Jane Smith',
    },
    {
      thoughtText: 'Feeling excited about the weekend!',
      username: 'Michael Johnson',
    },
    {
      thoughtText: 'Enjoying the sunny weather!',
      username: 'Emily Brown',
    },
    {
      thoughtText: 'Working on a new project!',
      username: 'John Doe',
    },
    {
      thoughtText: 'Life is beautiful!',
      username: 'Olivia Wilson',
    },
    {
      thoughtText: 'Feeling grateful today!',
      username: 'James Lee',
    },
    {
      thoughtText: 'Loving the new book I am reading!',
      username: 'Sophia Martin',
    },
    {
      thoughtText: 'Excited about the upcoming trip!',
      username: 'Robert Anderson',
    },
    {
      thoughtText: 'Chilling with friends!',
      username: 'Ava Martinez',
    },
    {
      thoughtText: 'Learning something new every day!',
      username: 'David Hernandez',
    },
    {
      thoughtText: 'Enjoying the beach!',
      username: 'Mia Gonzalez',
    },
    {
      thoughtText: 'Feeling inspired!',
      username: 'Daniel Robinson',
    },
    {
      thoughtText: 'Nature is amazing!',
      username: 'Isabella Clark',
    },
    {
      thoughtText: 'Spending time with family!',
      username: 'Matthew Lewis',
    },
  ];
  
  // Array of reactions
  const reactions = [
    {
      reactionBody: '👍',
      username: 'Jane Smith',
    },
    {
      reactionBody: '❤️',
      username: 'Michael Johnson',
    },
    {
      reactionBody: '😄',
      username: 'Emily Brown',
    },
    {
      reactionBody: '😊',
      username: 'John Doe',
    },
    {
      reactionBody: '😍',
      username: 'Jane Smith',
    },
    {
      reactionBody: '🔥',
      username: 'Olivia Wilson',
    },
    {
      reactionBody: '🎉',
      username: 'James Lee',
    },
    {
      reactionBody: '👏',
      username: 'Sophia Martin',
    },
    {
      reactionBody: '💖',
      username: 'Robert Anderson',
    },
    {
      reactionBody: '😎',
      username: 'Ava Martinez',
    },
    {
      reactionBody: '🌟',
      username: 'David Hernandez',
    },
    {
      reactionBody: '🌞',
      username: 'Mia Gonzalez',
    },
    {
      reactionBody: '🚀',
      username: 'Daniel Robinson',
    },
    {
      reactionBody: '🌺',
      username: 'Isabella Clark',
    },
    {
      reactionBody: '😇',
      username: 'Matthew Lewis',
    },
  ];
  

const User = require('../models/user'); // Assuming this is the path to your User model
const Thought = require('../models/Thought'); // Assuming this is the path to your Thought model
const Reaction = require('../models/Reaction'); // Assuming this is the path to your Reaction model
const connection = require('../config/connection');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    // Create empty array to hold the users
  const users = [];

  
  for (let i = 0; i < userNames.length; i++) {
    const username = userNames[i];
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const email = `${first}.${last}`;
    const numberOfFriends=Math.floor(Math.random() * ( userNames.length));
    const friends=[];
    for (let j=0;j<numberOfFriends;j++){
        friends[j]=userNames[Math.floor(Math.random() * ( userNames.length))]
    }

    students.push({
        username,
        email,
      github,
      assignments,
    });
  }
});
async function seedData() {
  try {


    // Create users and store their IDs in an array
    const userIds = await User.insertMany(userNames.map((name) => ({ username: name })))
      .then((users) => users.map((user) => user._id))
      .catch((err) => {
        console.error('Error creating users:', err);
        throw err;
      });

    // Create thoughts and store their IDs in an array
    const thoughtIds = await Thought.insertMany(
      thoughts.map((thought) => ({
        ...thought,
        username: userIds[userNames.indexOf(thought.username)],
      }))
    )
      .then((thoughts) => thoughts.map((thought) => thought._id))
      .catch((err) => {
        console.error('Error creating thoughts:', err);
        throw err;
      });

    // Create reactions and associate them with thoughts
    await Reaction.insertMany(
      reactions.map((reaction) => ({
        ...reaction,
        thought: thoughtIds[thoughts.findIndex((thought) => thought.username === userIds[userNames.indexOf(reaction.username)]]),
      }))
    ).catch((err) => {
      console.error('Error creating reactions:', err);
      throw err;
    });

    console.log('Data seeded successfully!');

    // Disconnect from the MongoDB database
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

// Call the seedData function to start seeding the data
seedData();
