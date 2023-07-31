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
    'This is my first thought!',
    'Having a great day!',
    'Feeling excited about the weekend!',
    'Enjoying the sunny weather!',
    'Working on a new project!',
    'Life is beautiful!',
    'Feeling grateful today!',
    'Loving the new book I am reading!',
    'Excited about the upcoming trip!',
    'Chilling with friends!',
    'Learning something new every day!',
    'Enjoying the beach!',
    'Feeling inspired!',
    'Nature is amazing!',
    'Spending time with family!',
  ];
  
  // Array of reactions
  const reactions = ['👍','❤️','😄','😊','😍','🔥','🎉','👏','💖','😎','🌟','🌞','🚀','🌺','😇',];
  
const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
const getRandomUser = ()=> `${userNames[genRandomIndex(userNames)]}`;
const getRandomThought =()=> `${thoughts[genRandomIndex(thoughts)]}`;
const getRandomReaction =()=> `${reactions[genRandomIndex(reactions)]}`;
const getUsers=()=> userNames;
module.exports={
    getRandomUser,
    getRandomThought,
    getRandomReaction,
    getUsers
}