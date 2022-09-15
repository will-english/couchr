### 9/14
- We had a bug with the add-movie-to-list button (again) due to an issue with how the props were being sent to different components. I changed the functionality to automatically add movies to new lists.
- I realized my unit test wasn't actually working with the user-auth credentials, so Zach helped me through some of that
- However, we never actually figured out the issue. So my unit test only works without the auth decorator in the backend views. Therefore, the unit test only tests that the views work and a List can be created.
- Then I worked on putting together the component that renders the Movie Reviews. I was able to fetch the right information and display it, but we still need to finalize the styling and layout.
### 9/13
- I got the create review form modal to be fully functional today
- I learned that it's not "correct" to change a component's state based on the props passed into the modal, so instead I just passed the props into the API call, and I didn't define a state for those attributes
- We also ran into some GIT issues that we're still trying to solve, for some reason some functions/features have stopped working after we merge with main
### 9/12
- Zach helped me work through unit tests for the backend, we also consulted with Alissha and Dalonte
- After importing the correct libraries and using the correct built-in functions, we were able to successfully pass user auth-credentials through a new user, and then test whether or not that user can create a list using our backend View functions
- This took a long time, and I don't think I would have been able to write this unit test without the help of the SEIRs/instructor, however I learned a lot from this process and I'm happy I didn't choose to test our features that didn't require auth-credentials
### 9/9
- Zach helped me work through unit tests for the backend, however most of our features require a user login, and we were having issues creating a user and passing through their auth-credentials
### 9/8
- The add movie to list button on the frontend stopped working ever since we added the user auth feature, and I forgot to update it, so I added the credentials to allow this functionality to work again
- I did pair programming with Will and Sheldon for our component that lists a User's movie lists
- Will primarily coded, and I provided support
- We had some issues with React re-rendering our state multiple times and changing the data, which we didn't fully understand
- Zach helped us correct our props and state
### 9/7
- Will and I did pair programming to test whether or not our lists can be made public/private
- Will primarily coded, and I provided support
- I started working on the Public Lists page on the frontend
- I tried to mimic some of our other pages and practice my React knowledge/skills
- While doing this, I had to tweak some backend views so I could get the data that was needed from the JSON response
### 9/6
- I added the CreateReviewForm modal over the weekend, but was having issues with actually POSTing the data
- I believe the blocker was how I was incorrectly mounting a prop into the component's state
- Today Will and I worked on the backend to automatically create a Liked, Watched, and Wish list for every user after signup
- We tried to create this feature from the frontend, but found a way to do it through the backend without having to pass user-auth credentials
- We also fixed the drop-down list to show the current user's movie lists with user-auth credentials
### 9/2
- I was going to add the Create New Review modal that I created yesterday onto Movie Detail page, but we ran into some issues with Auth
- We worked with the SEIRs for a bit before we had to go to Mandatory Fun
- Afterwards, I tweaked some of the Review models/views/encoders so that when we create a Review, the Movie associated with it will get created in the DB if it doesn't already exist
- Overall, we didn't have much time to work on the project as a group today due to other assignments in class and Mandatory fun
### 9/1
- Added a Create New Review modal form as an individual component
- Since our backend is now integrated with Auth methods, I had trouble submitting the form from the frontend to the backend
- Zach helped me load the Auth context data into the file, which includes the user's token and username
- With this username data, I was able to successfully create the form and make API calls to the backend methods
### 8/31
- Did pair programming with Will to get the user auth to work
- Will primarily coded and I provided support
- I had to tweak some of the backend models/views to accomodate for the auth settings that Will setup
- We tested the auth by creating a user, logging in, creating a movie list, and then checking if the list pops up when logged out
- We also discussed our "editor's top picks" of movies to showcase on the website
### 8/30
- Did pair programming with Will and Sheldon on the frontend
- We added a Create New List button to popup a modal form that hits the List POST method from the backend
- This took all day since the modal was triggered from a drop-down menu item
- Sheldon and Will primarily coded and I provided support
### 8/29
- Did pair programming with Sheldon on the frontend
- Sheldon primarily coded and I provided support
- We worked on the Movie Detail page to add popup messages on the Add Movie to List button
- The popup messages display whether or not the movie was successfully added, or if it was already on the list
- This functionality required me to tweak the backend views, to send a response code when a movie was already on the list
- I learned a lot just by watching Sheldon code, how he tackles a problem, and what he Googles
### 8/25
- Today I got to familiarize myself with the frontend of our application. It was great to see how much progress the frontend team made
- I added a button to add movies to Lists, proving that the frontend can in fact speak with the backend
- This took some time since I had to tweak some backend code to make sure everything worked properly
- I don't feel as comfortable on the frontend as I do with the backend, simply because we've had more time in this bootcamp to play with the backend
### 8/24
- Did pair programming with Will to review my logic, he had some suggestions to refactor and organize my code
- We broke the List's PUT method into 2 separate views, for simplicity and organization
- One PUT method is the standard version where the Lists's name and description can be updated
- The other PUT method is to add/remove movies to the List, which is a little bit more complicated and was an eye-sore altogether
- I learned that even though my code worked (for the most part), it can still be difficult for others to interpret if it's not intuitive
- Because I couldn't figure out how to use the standard encoders for models with m2m attributes, I created knockoff encoders within the Views file itself - 1 for the List, 1 for the Movie
- I created and tested the Reviews application models/views in Insomnia
- Next steps: pair program / review again, and then integrate the User Auth functionality
### 8/23
- Did pair programming with Will to review my logic
- Will shared a bit about his progress with user authentication
- Setup 3rd party API to mimic what would happen on the frontend when integrating the API calls with the backend, this took me a while as I was reviewing older projects that utilized 3rd party APIs
- Played around with API calls and backend views
### 8/22
 - added a boolean logic into the List PUT method in order to add/remove movies
 - initially thought we'd use the DELETE method to remove movies, but it makes more sense for this logic to be applied in the List's PUT. On the frontend/React side, the add/remove movie buttons will call the list's PUT method, and will not use a DELETE method.
 - Did pair programming with Sheldon to review my logic
 - Will and Dalonte helped us start up our docker-compose.yaml file - this took a lot of time today
 - blocker: how to call MovieVO's POST function inside List's PUT function?
### 8/19
 - Zach helped with my view functions after changing the movie attribute in the List model from a foreign key to a many-to-many relationship
 - m2m relationships are new to me and I had issues passing the data through the encoders, so we ended up updating the views to not use the encoders at all
 - next steps: need to revise List view's POST function to add multiple movies instead of just 1
### 8/18
 - started models and views for Lists and MovieVOs
 - created fake MovieVOs to test in Insomnia
 - blocker: how to add multiple movies into one list instance?
 - other: not 100% sure how 3rd party API will interact with models/views