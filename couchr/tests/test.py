from django.test import TestCase
from django.contrib.auth.models import User
from django.test import Client
import json
from couchr_lists.models import List, MovieVO
import requests

# Edward created this test
# open couchr terminal from docker
# run python manage.py test

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
        print("token: ", token)
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

class CreateListTestCase(TestCase):
    def setUp(self):
        # Setup run before every test method.
        self.username = 'test_username'
        self.token = signup(self)

    def test_something_that_will_pass(self):
        pass

    def test_something_that_will_fail(self):
        url = f'http://localhost:8000/api/lists/user/{self.username}/'

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
        )

        response.json()

        if response:
            list = List.objects.get(name='list_name_test')
            self.assertEqual(list.length, 0)