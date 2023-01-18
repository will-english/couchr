# import unittest
# from django.test import TestCase
# from unittest import TestCase
# from django.contrib.auth.models import User


# # Create your tests here.
# class TestUserRegistration(unittest.TestCase):

#     def test_register_user(self):
#             response = self.User.post('signup/', data={
#                 'username': 'alice',
#                 'password': 'foo',
#                 'email': 'alice@example.com',
#                 'first_name': 'foo',
#                 'last_name': 'foo',

#             }, follow_redirects=True)
#             assert response.status_code == 200
#             assert response.request.path == 'mine/' 


# if __name__ == '__main__':
#     unittest.main()

        # # login with new user
        # response = self.client.post('/auth/login', data={
        #     'username': 'alice',
        #     'password': 'foo',
        # }, follow_redirects=True)
        # assert response.status_code == 200
        # html = response.get_data(as_text=True)
        # assert 'Hi, alice!' in html
