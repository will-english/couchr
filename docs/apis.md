# APIs

## List Movies ##

**Method**: "GET"
**Path**: /api/movies

Output:
```json 
{
    "id": int,
    "title": string,
    "year": int,
    "rating": small int,
    "picture_url": url
}
```

Listing the movies shows all of the movies that we have pulled from a public api, listing their id, title, year, rating, and picture url.

## Movie Detail ##

**Method**: "GET"
**Path**: /api/movies/id

Output:
```json
{
    "id": int,
    "title": string,
    "year": int,
    "rating": small int,
    "picture_url": url,
    "genre": string,
    "actors": string,
    "directors": string,
    "plot": string,
    "runtime": int,
    "trailer_url": url
}
```

## Create Review ##
**Method**: "POST"/"GET"
**Path**: /api/movies/movie_id/reviews

Input:
```json
{
    "movie_id": int,
    "rating": int,
    "description": string
}
```

Output
```json
{
    "id": int,
    "movie_id": int,
    "title": string,
    "rating": int,
    "description": string,
    "review_date": string,
    "author": string,
}
```
## List lists ##
**Method**: "GET"
**Path**: /api/user_id/lists

Output:
```json
{
    "id": int,   
    "name": string,
}
```

## Create a new list ##

**Method**: "POST"
**Path**: /api/lists
