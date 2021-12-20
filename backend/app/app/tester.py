import requests
from time import sleep

BASE = "http://localhost/api/"
requests.put(BASE + "spiked/test/", {"base": 8, "distance": 2,"propability":.6, "size":4, "transmissionFrequency":1})
#sleep(2)
#requests.put(BASE + "random/test/", {"lowerBoundary": 5, "upperBoundary": 90, "transmissionFrequency":1})
