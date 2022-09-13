## 9/9/22
Today Jamie and I worked on making the site pretty! We worked on the color scheme some more and added it to the buttons on the pages. We also worked on the side bar some more to have it match the nav bar. I also implemented a function that shuffles the list of our favorite movies so that each time you view our main page, you see them in a different order! We fixed the issues with our buttons hovering oddly as well as made all of the posters in the carousels links to their pertaining movie's detail page

## 9/8/22
Today we got the dropdown on the list by genre to work and removed the sidebar from the app.js, and instead only added the component to the pages we wanted it on. It was surprising to me how difficult it was to format even though it looked fine when it was in the App.js. I am a little concerned that our buttons still have their hover effect active even after clicking the button and moving the mouse away. We also realized that the list by genre endpoint we have been using only gives 20 movies at a time. Our way around this was by making a "fake" pagination that re-fetches when you click "next page" or "previous page" and pulls new movies.

## 9/7/22
I feel that we made a lot of progress today. Jamie worked on fixing the search bar while I worked on fixing the sidebar issues. I thought I had fixed it completely before I realized it was re-rendering on a continuous loop. I was very disappointed. We decided that on the list by genre page, instead of the same sidebar that lists the genres, we would add a dropdown with the other genres to look at. I look forward to getting it to work tomorrow.

## 9/6/22
Today Jamie and I got the search bar to work! It was a lot of fun figuring out how to hit that api endpoint and put the query into it. We spent a lot of time trying to make sense of transferring props from one page to the other but ended up being fine with getting the id's from the URLs instead. We are still having the reload issue but Allisha spoke with us and we agreed changing our sidebar to have a onClick handler that will help reset the state when a genre is chosen.

## 9/2/22
Today Jamie and I were able to get the sidebar rendered in the App.js so that it will show up on all pages! Getting it to scroll with each page was a small challenge but we got it to work. Our current blocker is that when we are already looking at a genre, if we select a new one, it won't repopulate the list of movies without the user refreshing.

## 9/1/22
Today I made another carousel for our main page with the list of our favorite movies. I also recoded our movie list page into a list by genre page since there was no need for a page of random movies with no rhyme or reason. Jamie is working on a sidebar with a list of the genres that will bring the user to this page for each genre.

## 8/31/22
Today felt very productive. Jamie, Sheldon, and I finally got the continuous loop of rendering to stop and added a carousel of the popular movies to our main page! I gathered a list of everyone's favorite movies and got the corresponding movie id's from our third api and look forward to applying what I learned today into a new carousel of our favorite movies tomorrow!

## 8/30/22
Today was not as productive as some of our others. We found that the useEffect on our Main Page kept rendering on a continuous loop and couldn't figure out how to stop it. Jamie thought of adding pagination but we are only showing 20 movies so it isn't necessary but it does stop the rendering. We spent hours trying to get the pagination to work but seem to have gotten somewhere! It doesnt solve the entire issue but definitely helps.

## 8/29/22
Today was a lot of fun trying to figure out the functional React components using hooks. It was cool to use the explorations from over the weekend on our project. We ran into some blockers getting the colummns to populate with our array from the API but I am confident we will figure it out tomorrow! 

## 8/24/22
Today felt very productive. Jamie, Sheldon and I spent the day sharing our screens and working on the frontend. We found that some of the movies didnt have posters from the API so I designed an error picture on Canva that would take it's place for those movies. We made coloums to list the movies in cards and made the cards into links bringing the user to the movie's detail page. One small blocker we met today was when we found a bug in our movie detail page, and realized it was only taking the last number of the url to use as the movie id instead of the entire number so we used the split method on the url using the "/" divider to grab the entire movie id. I feel a lot more comfortable with git branches today and am very happy with our progrress.

## 8/23/22
Today we worked on creating the React pages. We took a while reading up on how to make detail pages on React with a specific id in the url and we were able to get it started! As well as starting a browse movie page. I worry about using git branches, we seem to spend a lot of day fixing git merge issues but Im sure we will get better as we practice each day.

## 8/22/22
Today was much better! We used the project advice on learn to completely rebuild our project. Will spent a lot of time over the weekend reviewing the material and was able to walk us through what each step did. We did hit a blocker when it wouldn't build properly on all of our computers but Dalonte and Zack were readily available to help us out. Now we plan to work on our git pushing and fetching and merging to avoid conflicts in the future.

## 8/19/22
Today was tough. I don't feel that I contributed much today as we spent all of the day getting everyone's docker and react containers to work. The docker compose is very important so today was necessary, but we did not further the project in any other way.

## 8/18/22
Today felt productive. We switched our third party api a couple of times and I think this time we all agree this is the best one. Jamie and I collaborated to create a logo for the project and finished up the mockups and put them in the ghi mark down files. We hit a bit of a blocker getting the react to work with our docker compose but hopefully tomorrows lesson will help us fix any issues left. We also agreed on some possible color schemes and I am looking forward to creating React pages from our third party API.

