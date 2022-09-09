from django.test import TestCase

# Create your tests here.


# testing instructions

# cd into couchr_lists
# run command <<python -m pytest tests.py>>


def random():
    return "something"

def test_random():
    assert random() == "something"