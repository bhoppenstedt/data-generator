import requests
from time import sleep

BASE = "http://localhost/api/"
requests.post(BASE + "random/test/", {"lowerBoundary": 1, "upperBoundary": 90, "transmissionFrequency":1})
#sleep(2)
#requests.post(BASE + "emphasized/test2/", {"center": 5, "scale": 2, "transmissionFrequency":1})
