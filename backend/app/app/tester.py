import requests

BASE = "http://localhost/api/sinus/"
#requests.put(BASE + "kevin/", {"lowerBoundary": 1, "upperBoundary": 90, "transmissionFrequency":1})
requests.put(BASE + "kevin/", {"frequency": 5, "amplitude": 90, "transmissionFrequency":1})
