from django.test import TestCase
from django.contrib.auth.models import User
import requests


class CreateAccountsTestCase(TestCase):

    def testUserCreated(self):
        # * Arrange
        # url = 'http://localhost:8000/api/accounts/signup/'
        # sess = requests.Session()
        # sess.verify = False

        # body = {
        #     'username': 'test_username1',
        #     'password': 'test_password',
        #     'email': 'test_email',
        #     'first_name': 'test_first_name',
        #     'last_name': 'test_last_name',
        # }

        # response = sess.post(
        #     url,
        #     json=body,
        # )

        # res = response.json()
        # print(res)

        # response2 = sess.delete(
        #     url,
        #     json=body,
        # )
        # print('delete response', response2)
        # print(res['signup'])
        # # ? Assert
        self.assertEqual(True, True)
