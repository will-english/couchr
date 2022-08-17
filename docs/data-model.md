## Movie ##
| movie       | list    | user     |   |   |
|-------------|---------|----------|---|---|
| title       | movies  | name     |   |   |
| year        | name    | username |   |   |
| rating      | created |          |   |   |
| picture_url | user_id |          |   |   |
| genre       |         |          |   |   |
| actors      |         |          |   |   |
| directors   |         |          |   |   |
| plot        |         |          |   |   |
| runtime     |         |          |   |   |
| trailer_url |         |          |   |   |
|             |         |          |   |   |


## List ##

| name       | type   | unique | optional |
|------------|--------|--------|----------|
| name       | string | no     | no       |
| movie_href | string | no     | no       |
| user_href  | string | no     | no       |

## User ##

| name      | type   | unique | optional |
|-----------|--------|--------|----------|
| name      | string | no     | no       |
| user_name | string | yes    | no       |