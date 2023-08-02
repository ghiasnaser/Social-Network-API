# Social-Network-API

## Description
This is an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

## Installation
N/A

## Usage

Open the terminal and navigate to the directory containing the Logo Generator files.
Type npm run dev and press Enter to run the Social-Network-API.
Then you have to use Insomnia to do the routs tests as following:
First rout to test (api/user)
** To test the GET route for retrieving a all the users using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to GET.
    3. Enter the URL: http://localhost:3001/api/user.
    4. Click the "Send" button to send the GET request.
** To test the GET route for retrieving a specific user using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to GET.
    3. Enter the URL: http://localhost:3001/api/user/{userId}.
       Replace {userId} with the actual ID of the user you want to retrieve.
    4. Click the "Send" button to send the GET request.
** To test the POST route for creating new user using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to POST.
    3. Enter the URL: http://localhost:3001/api/user.
    4. Enter the following body in the body section
        {
        	"username":"{Enter the user name you want for the new user}",
	        "email":"{Enter a valide email address}"
        }
    5. Click the "Send" button to send the POST request.
** To test the PUT route for updating a user using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to POST.
    3. Enter the URL: http://localhost:3001/api/user/{userId}.
       Replace {userId} with the actual ID of the user you want to update.
    4. Enter the following body in the body section
       {
        	"username":"{Enter the updated name of the user}",
	        "email":"{Enter the updated valide email address}"
        }
    5. Click the "Send" button to send the PUT request.
** To test the DELETE route for deleting a user using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to DELETE.
    3. Enter the URL: http://localhost:3001/api/user/{userId}.
       Replace {userId} with the actual ID of the user you want to delete.
    4. Click the "Send" button to send the DELETE request.
** To test the POST route for adding a friend using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to POST.
    3. Enter the URL: http://localhost:3001/api/user/{userId}/friends.
       Replace {userId} with the actual ID of the user you want to add friend to.
    4. Enter the following body in the body section
       {
        	"_id": "{Enter the id of the user that you want to add it as friend}"
        }
    5. Click the "Send" button to send the post request.
** To test the GET route for getting the list of friends for a user using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to GET.
    3. Enter the URL: http://localhost:3001/api/user/{userId}/friends.
       Replace {userId} with the actual ID of the user you want to get his friends.
    4. Click the "Send" button to send the post request.
** To test the DELETE route to delete a friend for a user using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to DELETE.
    3. Enter the URL: http://localhost:3001/api/user/{userId}/friends/{friendId}.
       Replace {userId} with the actual ID of the user you want to delete his friend,
       and Replace {friendId} with the actual ID of the friend that you want to delete.
    4. Click the "Send" button to send the post request.

Second rout to test (api/thought)
** To test the GET route for retrieving a all the thoughts using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to GET.
    3. Enter the URL: http://localhost:3001/api/thought.
    4. Click the "Send" button to send the GET request.
** To test the GET route for retrieving a specific thought using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to GET.
    3. Enter the URL: http://localhost:3001/api/thought/{thoughtId}.
       Replace {thoughtId} with the actual ID of the thought you want to retrieve.
    4. Click the "Send" button to send the GET request.
** To test the POST route for creating new thought using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to POST.
    3. Enter the URL: http://localhost:3001/api/thought.
    4. Enter the following body in the body section
        {
        	"thoughtText": "{Enter the content of the thought}",
	        "username": "{Enter the name of the thought's owner}"
        }
    5. Click the "Send" button to send the POST request.
** To test the PUT route for updating a thought using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to POST.
    3. Enter the URL: http://localhost:3001/api/thought/{thoughtId}.
       Replace {thoughtId} with the actual ID of the thought you want to update.
    4. Enter the following body in the body section
       {
        	"thoughtText": "{Enter the updated content of the thought}",
	        "username": "{Enter the updated name of the thought's owner}"
            // and you can add all the fields that you want to update
        }
    5. Click the "Send" button to send the PUT request.
** To test the DELETE route for deleting a thought using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to DELETE.
    3. Enter the URL: http://localhost:3001/api/thought/{thoughtId}.
       Replace {thoughtId} with the actual ID of the user you want to delete.
    4. Click the "Send" button to send the DELETE request.
** To test the POST route for adding a reaction to the thought using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to POST.
    3. Enter the URL: http://localhost:3001/api/thought/{thoughtId}/reactions.
       Replace {thoughtId} with the actual ID of the thought you want to add reaction to.
    4. Enter the following body in the body section
       {
        	"reactionBody":"❤️", // replace the reaction with the one you want
	        "username":"{Enter the name of the reaction's owner}"
        }
    5. Click the "Send" button to send the post request.
** To test the GET route for getting the list of reactions for a thought using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to GET.
    3. Enter the URL: http://localhost:3001/thought/{thoughtId}/reactions.
       Replace {thoughtId} with the actual ID of the thought you want to get its reactions.
    4. Click the "Send" button to send the post request.
** To test the DELETE route to delete a reaction for a thought using Insomnia, follow these steps:
    1. Open Insomnia and create a new request.
    2. Set the request type to DELETE.
    3. Enter the URL: http://localhost:3001/api/thought/{thoughtId}/reactions/{reactionId}.
       Replace {thoughtId} with the actual ID of the thought you want to delete its reaction,
       and Replace {reactionId} with the actual ID of the reaction that you want to delete.
    4. Click the "Send" button to send the post request.

## Assets
N/A

## Credits

N/A

## License
Licensed under the [MIT](https://github.com/ghiasnaser/Social-Network-API/blob/e48c8fe2574632e699e7122794eb641dc15acd7e/LICENSE) license.

## Links
The Recorded video link on how to use it: https://watch.screencastify.com/v/iJ1cEOhENa859vJW8nIZ
The repository link: https://github.com/ghiasnaser/Social-Network-API.git
