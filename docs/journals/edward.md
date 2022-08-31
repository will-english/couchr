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