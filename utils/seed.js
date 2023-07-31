const connection=require('../config/connection');
const {User ,Thought} =require('../models');
const {getRandomUser ,getRandomThought ,getRandomReaction, getUsers}=require('./data');

connection.on('error',(err)=>err);

connection.once('open',async ()=>{
    console.log('connected');
    // Delete the collections if they exist
    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }

    // Create empty array to hold the users
  const users = [];
  const userNames=getUsers();
  // Loop 20 times -- add users to the usres array
  for (let i = 0; i < userNames.length; i++) {
    const username = userNames[i];
    const first = username.split(' ')[0];
    const last = username.split(' ')[1];
    const email = `${first}.${last}@gmail.com`;

    users.push({
        username,
        email,
    });
  }
  console.log(users);
  console.log(userNames);

  const thoughts=[];

  // Loop 30 times -- add thoughts to the thoughts array
  for (let i = 0; i < 30; i++) {
    const reactions=[];
    const thoughtText =getRandomThought();
    const username = getRandomUser();
    for (let j=0;j<5;j++){
        const reactionBody =getRandomReaction();
        const reactionUsername  = getRandomUser();
        reactions.push({
            reactionBody,
            reactionUsername,
        });
    }
    thoughts.push({
        thoughtText,
        username,
        reactions
    });
  }


// Add users to the collection and await the results
await User.collection.insertMany(users);

// Add thoughts to the collection and await the results
await Thought.collection.insertMany(thoughts);

// After seeding is complete, retrieve all the thoughts from the database
const allThoughts = await Thought.find({});

// Loop through each thought and update the user's thoughts array
for (const thought of allThoughts) {
  const name  = thought.username;
  console.log(name);
  // Find the user by the username
  const user = await User.findOne( {username:name });
  const numberOfFriends= Math.floor(Math.random() * (5)) + 1;
  if (user) {
    // If the user is found, update their thoughts array with the thought's _id
    user.thoughts.push(thought._id);
    
    // add random friends 
    for (let i =0;i<numberOfFriends;i++){
      const friendname=getRandomUser();
      if (friendname != user.username){
        const friendId= await User.findOne({username:friendname}).select('_id');
        user.friends.push(friendId);``
      }
    }
    await user.save();
  }
}


console.info('Seeding complete!');
process.exit(0);
});