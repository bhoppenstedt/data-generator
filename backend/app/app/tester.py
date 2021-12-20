import requests
from time import sleep

BASE = "http://localhost/api/"
requests.put(BASE + "emphasized/test/", {"center": 8, "amplitude": 2,"scale":3, "transmissionFrequency":1})
#sleep(2)
#requests.put(BASE + "random/test/", {"lowerBoundary": 5, "upperBoundary": 90, "transmissionFrequency":1})
