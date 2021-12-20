import requests
from time import sleep

BASE = "http://localhost/api/"
requests.post(BASE + "cosinus/test/", {"frequency": 1, "amplitude": 90, "transmissionFrequency":1})
#sleep(2)
#requests.put(BASE + "random/test/", {"lowerBoundary": 5, "upperBoundary": 90, "transmissionFrequency":1})
