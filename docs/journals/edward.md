### 8/22
 - added a boolean field on List model in order to make PUT function work with adding/removing movies
 - all older projects utilized a put function to edit the model, and a delete function to delete the model, but this project requires us to edit the list model by adding/removing a m2m attribute. This is why the boolean field was needed. On the frontend/React side, the add/remove movie buttons will call the list's PUT method, and will not use a DELETE method.
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