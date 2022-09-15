from django.test import TestCase
from couchr_lists.models import List
from django.contrib.auth.models import User
import requests

# Test written by Edward Nguyen
# open couchr terminal from docker
# open couchr_lists.views.py
# comment out the auth.jwt_login_required decorator from the api_lists function
# run python manage.py test


class CreateListTestCase(TestCase):
    def setUp(self):
        # Setup run before every test method.
        def signup(self):
            url = 'http://localhost:8000/api/accounts/signup/'
            sess = requests.Session()
            sess.verify = False

            response = sess.post(
                url,
                json={
                    'username': 'test_username',
                    'password': 'test_password',
                    'email': 'test_email',
                    'first_name': 'test_first_name',
                    'last_name': 'test_last_name',
                }
            )

            if response.ok:
                token = login(self)
                return token

        def login(self):
            url = 'http://localhost:8000/login/'

            sess = requests.Session()
            sess.verify = False

            response = sess.post(
                url,
                data={
                    'username': 'test_username',
                    'password': 'test_password',
                }
            )
            response.json()
            cookies = sess.cookies.get_dict()
            if response.ok:
                url = 'http://localhost:8000/api/tokens/mine/'
                token_response = sess.get(
                    url,
                    cookies={'jwt_access_token': cookies['jwt_access_payload']},
                )
                if token_response:
                    token = token_response.json()
                    return token.get('token')

        self.username = 'test_username'
        self.token = signup(self)

    def test_create_list(self):
        url = f'http://localhost:8000/api/lists/user/{self.username}/'
        print("url: ", url)
        json = {
            "name": "list_name_test",
            "description": "list_description_test",
        }
        sess = requests.Session()
        sess.verify = False
        sess.headers.update(
            {
                'Authorization': f'Bearer {self.token}',
            }
        )
        response = sess.post(
            url,
            json=json,
            cookies={'jwt_access_token': self.token},
        )

        response.json()
        if response:
            self.assertEqual(response.status_code, 200)