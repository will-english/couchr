# Couchr

A web application for tracking all of your new and favorite movies.

## Team Members

1. Christie
2. Edward
3. Jamie
4. Sheldon
5. Will

## Intended Market

Anyone who enjoys movies and wants to track their watch history, and 
those indecisive people who watch movies together.

## Functionality

MVP:

- user creation and authentication
- display a large libary of films
- track a users liked, watched, and want-to-watch movies
- movie search feature: by title
- allow users to create new movie lists, which can be public or private
- a movie details page, that provides in depth information on each title
    - average rating per title

Stretch Goals:
- user reviews for each title
- users can leave reviews and ratings on the movies
- user friends
- comparing multiple users watchlist to suggest a movie to watch together
- recently watched / recent activity page for each user
    - 5 most recent movies watched
- add streaming services to the movies detail page

## Design

* [API design](docs/apis.md)
* [Data model](docs/data-model.md)
* [GHI](docs/ghi.md)
* [Integrations](docs/integrations.md)

**test change**

## Instructions for building the application

create the volume:
    > docker volume create postgres-data
build and run the containers:
    > docker compose build
    > docker compose up

## Tests for each group member
Will:
couchr/tests/test_account_create.py

Sheldon:
ghi/src/Reviews/CreateNewReviewForm.test.js

Christie:
ghi/src/ListingMovies/ListByGenre.test.js

Jamie:
ghi/src/Watchlists/MyMovieLists.test.js

Edward:
couchr/tests/test_list_create.py

## Instructions for getting the api key
https://www.themoviedb.org/documentation/api
Go to the link above, you will need to create an account and then you
will be able to apply for an api key, there are no special requirements.

## each persons best moments and challenges
<br>

----

Please see below for the **MainPage** preview.
<br>

![Semantic description of image](/ghi/public/mainPage.gif)
<br>

Please see below for the **DetailPage** preview.
<br>

![Semantic description of image](/ghi/public/detailPage.gif)
<br>

Please see below for the **UserPage** preview.
<br>

![Semantic description of image](/ghi/public/userPage.gif)
<br>

Please see below for the **LoginPage** preview.
<br>

![Semantic description of image](/ghi/public/loginPage.gif)
<br>