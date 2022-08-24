import requests, json

def get_movie_data(movie_id):
    # jack reacher movie to test
    movie_id = 343611
    api_key="5d4614003d06d352c3b6b7aaa6003db9"
    print("movie_id: ", movie_id)
    params = {
        "movie_id": movie_id,
    }
    print("params: ", params)
    url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US'
    print("url: ", url)
    response = requests.get(url, params=params)
    print("response: ", response)
    content = json.loads(response.content)
    print("content: ", content)
    return content