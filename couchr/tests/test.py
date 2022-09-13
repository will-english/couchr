from django.test import TestCase
from couchr_lists.models import List
import requests

# Test written by Edward Nguyen
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
        print("self.token: ", self.token)

    def test_something_that_will_pass(self):
        pass

    def test_something_that_will_fail(self):
        url = f'http://localhost:8000/api/lists/user/{self.username}/'
        print("url: ", url)
        json = {
            "name": "list_name_test",
            "description": "list_description_test",
        }
        print("json: ", json)
        sess = requests.Session()
        sess.verify = False
        sess.headers.update(
            {
                'Authorization': f'Bearer {self.token}',
            }
        )
        print("sess: ", sess)
        response = sess.post(
            url,
            json=json,
        )

        response.json()
        print("response: ", response)
        lists = List.objects.all()
        print("lists: ", lists)
        if response:
            list = List.objects.get(name='list_name_test')
            print("list: ", list)
            self.assertEqual(list.length, 0)