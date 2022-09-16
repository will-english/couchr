09/16/2022
Final touches to the project were made today.  Mostly cleaned up the code and made the website look more appealing.  A meet the team page was added to the website that features each of our team member's head shots with our contact information.  
09/15/2022
The youtube trailer feature was completed with the back button added and a play icon added to the center of the video.  Also created an advertisement on the main page that has a link to redirect the user to the website related to the ad.    
09/14/2022
The blocker for the trailer feature of the website was finally overcome.  When on the detail page and the watch trailer button is clicked, the page is linked to the movie trailer that is the correct one.  The id from the previous page's state had to be passed into the youtube function.    
09/13/2022
Created the youtube trailer feature for the project, but ran into the blocker of it not changing to the correct movie trailer based off the id of the detail movie page.  Hopefully this can be finished by tomorrow.   
09/12/2022
Successfully added a unittest to the front end portion of the project.  It took hours to get it right, but eventually with trail and error, the test passed.  Started researching how react youtube works and plan to implement that tomorrow.  
09/08/2022
Today we added more css to the buttons in the nav and the list by genre page.  The css was completely finished for the sidebar with links that will take the user to the genre list page.  If no results are found for a movie search, then a message will appear saying no movies with the name was found.  No real blockers today, mostly styling was added. 
09/07/2022
The search bar in the nav was completed and css added for it.  The side bar was also completed and added into the main page.  We decided to create a dropdown for the genres on the list by genre page, rather than having the sidebar.  At the moment we are needing to get the dropdown to link to the corresponding genre page.  
09/06/2022
A search bar feature that is located in the nav was linked up to a search results when text is entered.  Any movies with the same word(s) are listed once a term is searched.  Prevent default was in the code causing it to not reload the page with the desired movie title, but once removed it was working fine.  We have a blocker of the sidebar not reloading when on the movie list page already.  After discussing this blocker with a SEIR, we believe an onClick event handler might be the best option.  
09/02/2022
Overall, today we were able to successfully work on the sidebar that listed all available genres as links to the movies under that selected genre.  We have a current blocker of the movie list page not repopulating with the list of movies for the selected genre.  The third party api is hit via genre id and then gets the list of those movies to be displayed on the website.  
8/31/2022
Today we were able to render the popular movies within the main page only once by using length of the popular movies.  With that resolved, we moved onto creating a carousel.js file and added it into the main page.  While working on the carousel, we ran into a blocker of the list of popular movies overlapping onto the carousel.  We were able to overcome the blocker by changing the css of the overall carousel to match the height of the carousel image. At the end of the day dried up the code and gathered everyone favorite movies for our Couchr top picks to be displayed on the main page.
8/30/2022
We continued to tackle the same blocker that we had yesterday.  Within the useEffect we determined that the empty array was only rendering once which was why the list of movies disappeared immediately after.  After adding the pagination into the main page and inserting it into the array, we were able to keep the movies listed on the main page.  We have a new blocker of getting the pagination to populate new movies once a different page number is selected.    
8/29/2022
Today was focused on building the react end of the home page for the website.  We decided to go with a function and use react hooks instead of using a class.  Our frontend team was able to successfully create four columns and get hit the api that list the more popular movies.  Unfortunately, we hit a blocker and the movies do not stay loaded on the home page.  The movies will appear for a second or so and then disappear.  We plan to continue tomorrow and overcome this blocker. 
8/25/2022
Today we started to work on the navbar design the layout using css and also add in the logo.  A search bar feature that is not yet functional was added as well.  The movie list page design was also adjusted some because of the cards were not lining up appropriately in comparison to the other cards.  Pagination was added by Will as well to the list page to limit the number of movies listed out at one time.  
8/24/2022
We began the day using trello to determine what tasks were top priority.  There was a bug found within the movie detail page that when an image was clicked the wrong movie detail page was shown.  The movie url needed to be split with the slash and the fifth item used to extract the appropriate data to be displayed in the browser.  A lot of fetching and merging was done today to the frontend branch and our own making it easier to get the operational flow down.  We added the movie image, title, year, and rating to the movie list page.  We also created the link that directs to the movie detail page.  Pagination was explored towards the end of the day and will be continued into tomorrow.  
8/23/2022
Today we broke off into our frontend and backend teams.  First, used trello to determine what our main goals for the day were and place those in the appropriate categories.  Once our goal were decided, we each created our own personal branches to work on as well as a frontend branch for each of us to merge our branches to.  By creating the frontend branch, it allowed us to each shared our commits within the frontend team and not push directly to the main branch until okayed.  Together we collaborated and recreated all files needed for our ghi and solved an issue of the index.js not finding babbel.  I noticed the issue was that there were duplicate scr, public, and node_module files.  After deleting ones within the app folder, it seemed to correct the issue for two of us and the website worked.  The next step was to get the movie detail page working which Sheldon was able to find a solution for.  The main takeaway from today was becoming more familiar with checking out different branches, pushing, and merging changes from other branches.  
8/22/2022
Deleted files within couchr app and recreated it using one teammates screen.  Once working on his computer, we each fetched and merged the recreated project.  Today we overcame the blocker of react not working on some of the windows computers.  
8/18/2022
Created the layout of our website using figma.  
Created ghi folder and minimum js files within the ghi. 

