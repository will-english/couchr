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