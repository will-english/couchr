## Movie ##
| Name        | Type   | Unique | Optional |
|-------------|--------|--------|----------|
| title       | string | no     | no       |
| year        | int    | no     | no       |
| rating      | int    | no     | no       |
| picture_url | string | no     | no       |
| genre       | string | no     | no       |
| actors      | string | no     | no       |
| directors   | string | no     | no       |
| plot        | string | no     | no       |
| runtime     | int    | no     | no       |
| trailer_url | string | no     | no       |

## Actor ##
| Name | Type   | Unique | Optional |
|------|--------|--------|----------|
| name | string | no     | no       |
|      |        |        |          |

## Director ##
| Name | Type   | Unique | Optional |
|------|--------|--------|----------|
| name | string | no     | no       |
|      |        |        |          |

## Genre ##
| Name | Type   | Unique | Optional |
|------|--------|--------|----------|
| name | string | no     | no       |
|      |        |        |          |



## List ##

| name       | type   | unique | optional |
|------------|--------|--------|----------|
| name       | string | no     | no       |
| movie_href | string | no     | no       |
| user_href  | string | no     | no       |
| description| string | no     | no       |

## User ##

| name      | type   | unique | optional |
|-----------|--------|--------|----------|
| name      | string | no     | no       |
| user_name | string | yes    | no       |
| email     | string | yes    | no       |