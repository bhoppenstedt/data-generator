from locust import HttpUser, task
import math
import random

class HelloWorldUser(HttpUser):
    
    @task
    def put_signals(self):
        number = str(random.randint(1,10000000))
        self.client.put("/random/test" + number + "/?lowerBoundary=5&upperBoundary=7&transmissionFrequency=1")
        self.client.patch("/random/test" + number + "/")
        
        
